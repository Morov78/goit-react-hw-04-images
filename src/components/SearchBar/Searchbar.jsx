import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function SearchBar({ onFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const value = searchQuery.trim();
    setSearchQuery('');

    if (value === '') {
      return;
    }

    onFormSubmit(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}></button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        ></input>
      </form>
    </header>
  );
}

SearchBar.prototype = {
  onSubmit: PropTypes.func.isRequired,
};
