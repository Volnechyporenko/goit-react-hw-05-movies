import PropTypes from 'prop-types';
import s from './Profile.module.css';

export default function Profile({ actor }) {
  return (
    <li className={s.actorCard} key={actor.id}>
      {actor.profile_path ? (
        <img
          className={s.image}
          src={`https://image.tmdb.org/t/p/w92/${actor.profile_path}`}
          alt={actor.name}
        />
      ) : (
        <div className={s.noFoto}>
          <p>No photo</p>
        </div>
      )}

      <p>{actor.name}</p>
      <p>{actor.character}</p>
    </li>
  );
}

Profile.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    profile_path: PropTypes.string.isRequired,
  }),
};
