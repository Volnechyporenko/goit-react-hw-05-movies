import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={s.container}>
      <NavLink className={s.navLink} activeClassName={s.selected} exact to="/">
        Home
      </NavLink>
      <NavLink className={s.navLink} activeClassName={s.selected} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
