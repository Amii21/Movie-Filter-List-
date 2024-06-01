import axios from "axios";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (year, selectedGenres) => {
  const genreString = selectedGenres.join(",");
  // console.log("YEARSSSS", year);
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      vote_count_gte: 100,
      with_genres: genreString,
    },
  });
  return response.data.results.map((movie) => ({
    ...movie,
    genre_names: movie.genre_ids.map(
      (id) => selectedGenres.find((genre) => genre.id === id)?.name || "Unknown"
    ),
    cast: [], // Fetching cast data if needed
    director: "", // Fetching director data if needed
  }));
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data.genres;
};

export const searchMovies = (query, page = 1) => {
  return axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
};
