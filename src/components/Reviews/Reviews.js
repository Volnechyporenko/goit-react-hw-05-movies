import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../constants';
import s from './Review.module.css';

export default function Review() {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}/reviews?api_key=${API_KEY}`)
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(new Error('Нет обзоров'));
      })
      .then(data => {
        console.log(data);
        setReview(data.results.slice(0, 5));
      })
      .catch(e => console.log(e));
  }, [movieId]);
  console.log(review);

  return (
    <div>
      {review.length > 0 ? (
        <ul className={s.reviewList}>
          {review.map(rev => (
            <li className={s.reviewItem}>
              <h3>Author: {rev.author}</h3>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No review found</p>
      )}
    </div>
  );
}
