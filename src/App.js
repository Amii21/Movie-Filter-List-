// src/App.js
import React from "react";
import MovieList from "./components/MovieList";
import "./App.css";
// import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="App">
      {/* <SearchBar /> */}
      <MovieList />
    </div>
  );
};

export default App;
