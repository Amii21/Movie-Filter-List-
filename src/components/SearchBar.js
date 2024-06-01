import React, { useState } from "react";
import { searchMovies } from "../services/movieService";
import "./MovieCard.css";

const SearchBar = (props) => {
  // console.log("Propss", props);
  const [query, setQuery] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await searchMovies(query);
    props.searchBarSetMovies(response.data.results);
    // console.log("RESPONSE", response);
  };

  const handleonChange = async (e) => {
    // console.log("AA", e.target.value.length);
    setQuery(e.target.value);
    if (e.target.value.length === 0) {
      const response = await searchMovies("");
      // console.log("RESS", response);
      props.searchBarSetMovies(response.data.results);
      window.location.reload();
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-fixed">
        <input
          type="text"
          className="search-height-fix"
          value={query}
          onChange={(e) => handleonChange(e)}
          placeholder="Search movies..."
        />
        <button type="submit" className="search-height">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
