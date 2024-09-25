import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom'; // Atualizado para usar useNavigate
import './BookingPage.css';

const services = [
  "Renovação de CNH",
  "Emplacamento de Veículos",
  "Segunda Via de RG",
  "Alistamento Militar",
  "Passaporte"
];

const BookingPage = () => {
  const { user } = useAuth(); // Aqui estamos usando o contexto
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Verificar se o usuário está logado
  useEffect(() => {
    if (!user) {
      alert("Efetue o login antes.");
      navigate("/login"); // Redireciona para a página de login
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);


  const validateForm = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/; // Formato de telefone (ex.: +5511987654321)
    
    if (!formData.name) tempErrors.name = "Nome é obrigatório.";
    if (!formData.email || !emailPattern.test(formData.email)) tempErrors.email = "Email inválido.";
    if (!formData.phone || !phonePattern.test(formData.phone)) tempErrors.phone = "Telefone inválido.";
    if (!formData.date) tempErrors.date = "Data é obrigatória.";
    if (!formData.time) tempErrors.time = "Hora é obrigatória.";
    if (!formData.service) tempErrors.service = "Selecione um serviço.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true); // Ativar o estado de carregamento
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            service: formData.service,
            userId: user.id, // Inclui o ID do usuário autenticado
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Agendamento realizado com sucesso!");
          // Limpar o formulário ou redirecionar conforme necessário
          setFormData({
            name: user.name,
            email: user.email,
            phone: '',
            date: '',
            time: '',
            service: ''
          });
        } else {
          console.error('Erro ao realizar agendamento:', data.message);
          alert(data.message || "Erro ao realizar agendamento.");
        }
      } catch (error) {
        console.error('Erro ao realizar agendamento:', error);
        alert('Erro ao realizar agendamento. Verifique a conexão com o servidor.');
      } finally {
        setLoading(false); // Desativar o estado de carregamento
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Agendamento de Serviços</h1>
        <p>Escolha uma data e horário para seu serviço.</p>
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
          
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className="error">{errors.time}</span>}
          
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Selecione um serviço</option>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <span className="error">{errors.service}</span>}
          
          <button type="submit" className="schedule-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Agendar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;