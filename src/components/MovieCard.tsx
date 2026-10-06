import React from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: number) => void;
  onRate: (id: number, rating: number) => void;
  onDelete: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onToggleWatched,
  onRate,
  onDelete,
}) => {
  return (
    <div className={`movie-card ${movie.watched ? 'watched' : ''}`}>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p><strong>Rok:</strong> {movie.year}</p>
        <p><strong>Gatunek:</strong> {movie.genre.join(', ')}</p>
        
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onRate(movie.id, star)}
              style={{ cursor: 'pointer', color: (movie.rating || 0) >= star ? '#f39c12' : '#ccc' }}
            >
              {(movie.rating || 0) >= star ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      <div className="movie-actions">
        <button
          onClick={() => onToggleWatched(movie.id)}
          className={`btn-watched ${movie.watched ? 'active' : ''}`}
        >
          {movie.watched ? '✓ Obejrzany' : 'Oznacz jako obejrzany'}
        </button>
        <button onClick={() => onDelete(movie.id)} className="btn-delete">
          Usuń
        </button>
      </div>
    </div>
  );
};