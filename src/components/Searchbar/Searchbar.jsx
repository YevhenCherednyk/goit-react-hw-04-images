import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SerchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Serchbar({ onSubmit, images }) {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!query.trim()) {
      return toast.warning('Please enter a valid value!');
    }

    onSubmit(query.trim());

    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <SerchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SerchBar>
  );
}

Serchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
