const axios = require('axios');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  params: {
    language: 'es-ES' // Cambia el idioma según tus necesidades
  }
});

const getPopularMovies = async () => {
  try {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

const getMovieById = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

const getTopRatedMovies = async () => {
  try {
    const response = await tmdb.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    throw error;
  }
};

module.exports = {
  getPopularMovies,
  getMovieById,
  getTopRatedMovies,
};
