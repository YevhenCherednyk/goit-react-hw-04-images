import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

import Modal from 'components/Modal';

export default function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  return (
    <GalleryItem id={id}>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={openModal}
        loading="lazy"
      />
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags}></img>
        </Modal>
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
