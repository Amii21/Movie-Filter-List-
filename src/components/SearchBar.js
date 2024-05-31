// src/components/SearchBar.js

import React, { useState } from "react";
import { searchMovies } from "../services/movieService";
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

const SearchBar = (props) => {
  console.log("PPP", props);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await searchMovies(query);
    props.searchBarSetMovies(response.data.results);
    // setResults(response.data.results);
    console.log("RESPONSE", response);
  };

  const handleonChange = async (e) => {
    console.log("AA", e.target.value.length);
    setQuery(e.target.value);
    if (e.target.value.length == 0) {
      const response = await searchMovies("");
      props.searchBarSetMovies(response.data.results);
      //   setResults(response.data.results);
    }
    // event.preventDefault();
    // const response = await searchMovies(query);
    // setResults(response.data.results);
    // console.log("RESPONSE", response);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => handleonChange(e)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {/* <div className="movie-card">
        {results.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />{" "}
            poster_path
            <div className="movie-info">
              <h3 className="text-title">{movie.title}</h3>
              <p className="text989898 text-left">
                <strong className="text-title">Genre:</strong>{" "}
                {movie.genre_ids.join(", ")}
              </p>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <ReadMore className="">{movie.overview}</ReadMore>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SearchBar;
