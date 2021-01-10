import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import MoviesList from '../../MoviesList/MoviesList';
import Searchbar from '../../Searchbar/Searchbar';
import { API_URL, API_KEY } from '../../constants';

export default function MoviesPage() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (query) {
      fetch(`${API_URL}search/movie?api_key=${API_KEY}&query=${query}&page=1`)
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(new Error('Нет фильмов'));
        })
        .then(data => {
          setMovies(data.results);
        })
        .catch(e => console.log(e));
    }
  }, [query]);

  useEffect(() => {
    const queryFromUrl = queryString.parse(history?.location?.search ?? {})
      .query;
    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [history.location.search]);

  const onSubmit = newQuery => {
    if (!newQuery || newQuery === query) {
      return;
    }
    setMovies([]);
    history.push({ ...history.location, search: `query=${newQuery}` });
  };
  console.log('query', query);
  return (
    <div>
      <Searchbar onSubmit={onSubmit} query={query} />
      <MoviesList list={movies} />
    </div>
  );
}
