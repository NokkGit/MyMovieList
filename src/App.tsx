import React, { useState } from 'react';
import initialMoviesData from './data/movies.json';
import { MovieCard } from './components/MovieCard';
import { MovieForm } from './components/MovieForm';
import type { Movie } from './types';
import './App.css';

export function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMoviesData as Movie[]);
  const [filter, setFilter] = useState<'all' | 'watched' | 'unwatched'>('all');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // Stan widoczności formularza

  const totalCount = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;

  const handleToggleWatched = (id: number) => {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    );
  };

  const handleRate = (id: number, rating: number) => {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, rating } : m))
    );
  };

  const handleDelete = (id: number) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    setMovies([]);
  };

  const handleAddMovie = (newMovieData: Omit<Movie, 'id' | 'watched'>) => {
    const newMovie: Movie = {
      ...newMovieData,
      id: movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1,
      watched: false,
      rating: 0,
    };
    setMovies([newMovie, ...movies]);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    return true;
  });

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Moja Lista Filmów</h1>
        <button
          className="btn-toggle-form"
          onClick={() => setIsFormOpen(!isFormOpen)}
          title={isFormOpen ? "Zamknij formularz" : "Dodaj nowy film"}
        >
          {isFormOpen ? '✕' : '+'}
        </button>
      </div>

      <div className="counter-badge">
        Obejrzane: {watchedCount} / {totalCount}
      </div>

      {isFormOpen && (
        <MovieForm
          onAddMovie={handleAddMovie}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <div className="controls-bar">
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Wszystkie
          </button>
          <button
            className={filter === 'watched' ? 'active' : ''}
            onClick={() => setFilter('watched')}
          >
            Obejrzane
          </button>
          <button
            className={filter === 'unwatched' ? 'active' : ''}
            onClick={() => setFilter('unwatched')}
          >
            Nieobejrzane
          </button>
        </div>

        {movies.length > 0 && (
          <button onClick={handleClearAll} className="btn-clear-all">
            Wyczyść wszystkie
          </button>
        )}
      </div>

      {filteredMovies.length === 0 ? (
        <p className="empty-message">Brak filmów do wyświetlenia.</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWatched={handleToggleWatched}
              onRate={handleRate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;