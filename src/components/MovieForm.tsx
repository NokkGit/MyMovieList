import React, { useState } from 'react';
import type { Movie } from '../types';

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id' | 'watched'>) => void;
  onClose: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie, onClose }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [genres, setGenres] = useState<string[]>(['']);

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...genres];
    newGenres[index] = value;
    setGenres(newGenres);
  };

  const addGenreField = () => {
    setGenres([...genres, '']);
  };

  const removeGenreField = (index: number) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year) return;

    const filteredGenres = genres.filter((g) => g.trim() !== '');
    onAddMovie({
      title,
      year: Number(year),
      genre: filteredGenres.length > 0 ? filteredGenres : ['Inne'],
    });

    onClose();
  };

  return (
    <div className="movie-form-modal">
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-header">
          <h3>Dodaj nowy film</h3>
          <button type="button" onClick={onClose} className="btn-close">
            &times;
          </button>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Tytuł filmu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Rok produkcji"
            value={year}
            onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group genres-group">
          <label>Gatunki:</label>
          {genres.map((genre, index) => (
            <div key={index} className="genre-input-row">
              <input
                type="text"
                placeholder={`Gatunek ${index + 1}`}
                value={genre}
                onChange={(e) => handleGenreChange(index, e.target.value)}
              />
              {genres.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGenreField(index)}
                  className="btn-remove-genre"
                >
                  usuń
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addGenreField} className="btn-add-genre-field">
            + Dodaj kolejny gatunek
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">Zapisz film</button>
          <button type="button" onClick={onClose} className="btn-cancel">Anuluj</button>
        </div>
      </form>
    </div>
  );
};