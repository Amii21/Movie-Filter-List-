import React, { useState, useEffect } from "react";
import { fetchGenres } from "../services/movieService";
import "./GenreFilter.css";

const GenreFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };
    loadGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    console.log("HHHH", genreId);
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [genreId]
    );
  };

  useEffect(() => {
    onFilterChange(selectedGenres);
  }, [selectedGenres, onFilterChange]);

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={selectedGenres.includes(genre.id) ? "active" : ""}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
