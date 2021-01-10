import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.css';

export default function MoviesList({ list = [] }) {
  const location = useLocation();
  return (
    <ul className={s.moviesList}>
      {list.map(item => (
        <li className={s.item} key={item.id}>
          <Link
            className={s.movieLink}
            to={{ pathname: `/movies/${item.id}`, state: { from: location } }}
          >
            {item.original_title ?? item.original_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MoviesList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      original_name: PropTypes.string.isRequired,
    }),
  ),
};
