import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación


const Cartelera = () => {
  const [movies, setMovies] = useState([]);
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación
  const navigate = useNavigate(); // Obtén el hook de navegación

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/popular');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleBuyClick = (movieId) => {
    if (isAuthenticated) {
      // Redirige a la página de compra si el usuario está autenticado
      navigate(`/comprar/${movieId}`);
    } else {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      navigate('/login');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '30px' }}>
        <h1>Películas de Estreno</h1>
        <div className="row">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map(movie => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card border-warning">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.overview}</p>
                    <p className="card-text"><small className="text-muted">Estreno: {formatDate(movie.release_date)}</small></p>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleBuyClick(movie.id)}
                      style={{ marginTop: '10px' }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center">
              <div role="status">
                <span className="sr-only">Cargando...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Cartelera;

