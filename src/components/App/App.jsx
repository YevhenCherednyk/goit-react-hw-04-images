import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from 'services/API';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

const IMG_PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getData() {
      setStatus('pending');
      try {
        const { hits, totalHits } = await API.findImages(query, page);
        const totalPages = Math.ceil(totalHits / IMG_PER_PAGE);
        const newImg = hits.map(({ id, largeImageURL, tags, webformatURL }) => {
          return { id, largeImageURL, tags, webformatURL };
        });

        if (!hits.length) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (page === 1) {
          toast.info(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }

        setImages(prevImages => [...prevImages, ...newImg]);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setStatus('resolved');
      }
    }

    getData();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalPages(null);
    setStatus('idle');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const btnisVisible =
    images.length > 0 && page !== totalPages && status === 'resolved';

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} images={images} />
      {images.length > 0 && <ImageGallery images={images} />}
      {status === 'pending' && <Loader />}
      {btnisVisible && <Button onClick={loadMore} />}
      <ToastContainer theme="colored" autoClose={3000} />
    </AppContainer>
  );
}
