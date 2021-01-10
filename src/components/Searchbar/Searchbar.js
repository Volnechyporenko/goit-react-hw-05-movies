import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit, query }) {
  console.log('search bar query', query);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setSearch(query ?? '');
  }, [query]);
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
  };
  console.log('search', search);
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
