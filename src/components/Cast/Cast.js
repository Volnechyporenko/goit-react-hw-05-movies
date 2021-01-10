import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../Cast/Profile/Profile';
import { API_URL, API_KEY } from '../constants';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(new Error('Нет списка актёров'));
      })
      .then(data => {
        setCast(data.cast.slice(0, 10));
      })
      .catch(e => console.log(e));
  }, [movieId]);

  return (
    <div>
      <ul className={s.actorsList}>
        {cast.map(actor => (
          <Profile actor={actor} />
        ))}
      </ul>
    </div>
  );
}
