import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SeatSelection = ({ quantity, onSeatsSelected }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalSeats = 30; // Total de asientos disponibles
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < quantity) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedSeats.length === quantity) {
      onSeatsSelected(selectedSeats);
    } else {
      alert(`Debes seleccionar exactamente ${quantity} asientos.`);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body p-4">
        <h2 className="card-title">Selecciona tus Asientos</h2><br />
        <div className="row row-cols-5">
          {seats.map(seat => (
            <div
              key={seat}
              className="col seat"
              onClick={() => handleSeatClick(seat)}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                textAlign: 'center',
                backgroundColor: selectedSeats.includes(seat) ? '#ffca2c' : 'transparent'
              }}
            >
              {seat}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning mt-3"
            onClick={handleConfirmSelection}
            disabled={selectedSeats.length !== quantity}
          >
            Confirmar Selección
          </button>
        </div>
      </div>
    </div>
  );
};

const Comprar = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
        generateShowtimes(response.data.runtime);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const generateShowtimes = (runtime) => {
    const showtimeInterval = Math.ceil(runtime / 60) + 1;
    const startTime = new Date();
    startTime.setHours(8, 0, 0); // Shows start at 8:00 AM
    const endTime = new Date();
    endTime.setHours(24, 0, 0); // Last show starts at 12:00 PM

    const times = [];
    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      times.push(timeString);
      startTime.setHours(startTime.getHours() + showtimeInterval);
    }

    setShowtimes(times);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handlePurchase = () => {
    if (selectedTime) {
      setShowSeatSelection(true);
    } else {
      alert('Por favor selecciona un horario.');
    }
  };

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
    navigate('/pagar', {
      state: {
        movie: movie.title,
        quantity,
        selectedSeats: seats,
        total: 4.75 * quantity,
        time: selectedTime
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '70px' }}>
        {movie ? (
          <div className="card mb-4">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img" alt={movie.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="card-title">{movie.title}</h1>
                  <p className="card-text">{movie.overview}</p>
                  <p className="card-text"><small className="text-muted">Estreno: {formatDate(movie.release_date)}</small></p>
                  <p className="card-text"><small className="text-muted">Duracion: {convertMinutesToHours(movie.runtime)}</small></p>
                  <p className="card-text"><small className="text-muted">Promedio de Votos: {movie.vote_average}</small></p>
                  <br />
                  <p>El precio por boleto es de 4.75$</p>
                  <div className="form-group w-25">
                    <label htmlFor="quantity">Cantidad de Boletos:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                  </div>
                  <br />
                  <div className="form-group w-25">
                    <label htmlFor="showtime">Selecciona un Horario:</label>
                    <select
                      className="form-control"
                      id="showtime"
                      value={selectedTime}
                      onChange={handleTimeChange}
                    >
                      <option value="">Selecciona un horario</option>
                      {showtimes.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <p>Total: {4.75 * quantity} $</p>
                  <button
                    className="btn btn-warning mt-3"
                    onClick={handlePurchase}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div role="status">
              <span className="sr-only">Cargando...</span>
            </div>
          </div>
        )}
        {showSeatSelection && (
          <SeatSelection quantity={quantity} onSeatsSelected={handleSeatsSelected} />
        )}
      </div>
    </div>
  );
};

export default Comprar;
