import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './Navigation/Navigation';
import s from './App.module.css';

const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./Pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() =>
  import('./Pages/MovieDetailsPage/MovieDetailsPage'),
);

export default function App() {
  return (
    <div className={s.mainContainer}>
      <Navigation />
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
