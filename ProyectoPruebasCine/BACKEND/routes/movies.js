const express = require('express');
const router = express.Router();
const { getPopularMovies, getMovieById, getTopRatedMovies } = require('../services/tmdb');

// Obtener películas populares
router.get('/popular', async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener películas de estreno
router.get('/top_rated', async (req, res) => {
  try {
    const movies = await getTopRatedtMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;