import { useEffect, useState } from 'react';
import MoviesList from '../../MoviesList/MoviesList';
import { API_URL, API_KEY } from '../../constants';
import s from './HomePage.module.css';

export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}trending/all/day?api_key=${API_KEY}`)
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(new Error('Нет фильмов'));
      })
      .then(data => {
        console.log(data);
        setList(data.results);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div className={s.homePage}>
      <h2>Trending today</h2>
      <MoviesList list={list} />
    </div>
  );
}
