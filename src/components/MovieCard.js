// src/components/MovieCard.js
import React, { useEffect, useState } from "react";
import "./MovieCard.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="fsize14 text989898 line-h22px text-justify">
      {isReadMore ? text.slice(0, 100) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "#e77817" }}
      >
        {isReadMore ? "...Read more" : " Show less"}
      </span>
    </p>
  );
};

const MovieCard = ({ movie }) => {
  useEffect(() => {
    console.log(movie, "28");
  });
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3 className="text-title">{movie.title}</h3>
        <p className="text989898 text-left">
          <strong className="text-title">Genre:</strong>{" "}
          {movie.genre_ids.join(", ")}
        </p>
        <p className="text989898 text-left">
          <strong className="text-title">Cast:</strong>{" "}
          {movie.cast == "" ? "No Data" : movie.cast}
        </p>
        <p className="text989898 text-left">
          <strong className="text-title">Director:</strong>{" "}
          {movie.director == "" ? "No Data" : movie.director}
        </p>
        {movie.overview == "" ? (
          ""
        ) : (
          <ReadMore className="">{movie.overview}</ReadMore>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
