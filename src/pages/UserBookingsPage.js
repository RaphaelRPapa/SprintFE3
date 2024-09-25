// UserBookingsPage.js
import React, { useEffect, useState, useCallback } from 'react';
import './UserBookingsPage.css';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserBookingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async () => {
    if (!user) return; // Early return if user is not available
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setBookings(data);
      } else {
        console.error(data.message);
        alert('Erro ao carregar agendamentos.');
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      alert('Erro ao buscar agendamentos.');
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      alert("Efetue o login antes.");
      navigate('/login');
    } else {
      fetchBookings(); // Call the fetchBookings function
    }
  }, [user, navigate, fetchBookings]); // Add fetchBookings to the dependency array

const handleCancelBooking = async (bookingId) => {
  const confirmCancel = window.confirm("Tem certeza de que deseja cancelar este agendamento?");
  if (confirmCancel) {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        alert('Agendamento cancelado com sucesso.');
      } else if (response.status === 404) {
        alert('Agendamento não encontrado.');
      } else {
        alert('Erro ao cancelar agendamento.');
      }
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento.');
    }
  }
};

  return (
    <div className="user-bookings-page">
      <h1>Meus Agendamentos</h1>
      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-bubble">
              <h3>{booking.service}</h3>
              <p>Data: {new Date(booking.appointment_date).toLocaleDateString()}</p>
              <p>Hora: {booking.appointment_time}</p>
              <button
                className="cancel-button"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancelar Agendamento
              </button>
            </div>
          ))
        ) : (
          <p className="no-bookings">Nenhum agendamento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage;
