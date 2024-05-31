// src/components/MovieList.js
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import { fetchMovies, fetchGenres } from "../services/movieService";
import GenreFilter from "./GenreFilter";
import SearchBar from "./SearchBar";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(2012);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);

  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };
    loadGenres();
    // loadMoreMoviesFirst(year);
    loadMoreMovies(year);
  }, []);

  const loadMoreMovies = async (year) => {
    // debugger;
    console.log("YEARS", year);
    const newMovies = await fetchMovies(year, selectedGenres);
    console.log("NEW", newMovies);
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    // setMovies(newMovies);
    setYear((prevYear) => prevYear + 1);
    // if (newMovies.length < 20) {
    //   setHasMore(false);
    // }
    if (newMovies.length === 0) setHasMore(false);
  };

  const loadMoreMoviesFirst = async (year) => {
    // debugger;
    console.log("YEARS", year);
    const newMovies = await fetchMovies(year, selectedGenres);
    console.log("NEW", newMovies);
    // setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setMovies(newMovies);
    setYear((prevYear) => prevYear + 1);
    if (newMovies.length === 0) setHasMore(false);
  };

  useEffect(() => {
    if (selectedGenres.length) {
      setMovies([]);
      setYear(2012);
      loadMoreMovies();
    }
  }, [selectedGenres]);

  const searchBarSetMovies = (movies) => {
    setMovies(movies);
  };
  console.log(movies, "5000");
  return (
    <div>
      <div className="sticky-filter">
        <h1>Movie Filter App</h1>
        <div>
          <GenreFilter
            className="filter-data"
            genres={genres}
            onFilterChange={setSelectedGenres}
          />
          <SearchBar searchBarSetMovies={searchBarSetMovies} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => loadMoreMovies(year)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {/* <h1 className="year-center">{year}</h1> */}
        <div className="movie-list">
          {/* <SearchBar /> */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
