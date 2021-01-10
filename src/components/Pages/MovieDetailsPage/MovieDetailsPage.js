import { Link, useParams, Route } from 'react-router-dom';
import { API_URL, API_KEY } from '../../constants';
import { useState, useEffect } from 'react';
import s from './MovieDetailsPage.module.css';
import Cast from '../../Cast/Cast';
import Review from '../../Reviews/Reviews';
import GoBack from '../../GoBack/GoBack';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (movieId) {
      fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(new Error('Нет данных по фильму'));
        })
        .then(data => {
          setMovie(data);
        })
        .catch(e => console.log(e));
    }
  }, [movieId]);
  const {
    genres,
    title,
    poster_path,
    original_title,
    overview,
    vote_average,
    vote_count,
    id,
  } = movie;
  const userscore = vote_count
    ? Math.round((vote_average * 100) / vote_count)
    : 0;
  return (
    <div className={s.details}>
      <div className={s.goBack}>
        <GoBack />
      </div>
      <div className={s.container}>
        <div className={s.containerLeft}>
          {poster_path ? (
            <img
              className={s.image}
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt={title}
            />
          ) : (
            <div className={s.noPoster}>
              <p>No poster</p>
            </div>
          )}
        </div>
        <div className={s.containerRight}>
          <div>
            <h2>{original_title}</h2>
            <p>User Score: {userscore}%</p>
          </div>
          <div>
            <h3>Overview</h3>
            <p>{overview}</p>
          </div>
          <div>
            <h3>Genres</h3>
            <p className={s.genres}>
              {(genres || []).map(genre => (
                <span className={s.genreItem} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className={s.container}>
        <div>
          <h3>Additional information</h3>
          <ul className={s.adInfo}>
            <li className={s.adInfoItem}>
              <Link className={s.adInfoLink} to={`/movies/${id}/cast`}>
                Cast
              </Link>
            </li>
            <li className={s.adInfoItem}>
              <Link className={s.adInfoLink} to={`/movies/${id}/review`}>
                Review
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieId/review">
          <Review />
        </Route>
      </div>
    </div>
  );
}
