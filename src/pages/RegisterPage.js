// src/components/RegisterPage.js
import React, { useState, useEffect } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '' // Adicionando o campo de telefone
  });

const [errors, setErrors] = useState({});

const validateForm = () => {
  let tempErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?\d{10,15}$/; // Formato de telefone (ex.: +5511987654321)
  
  if (!formData.name) tempErrors.name = "Nome é obrigatório.";
  if (!formData.email || !emailPattern.test(formData.email)) tempErrors.email = "Email inválido.";
  if (!formData.phone || !phonePattern.test(formData.phone)) tempErrors.phone = "Telefone inválido.";

  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) { 
    try {
      const response = await fetch('http://localhost:5000/register', { // URL do seu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }

      const data = await response.json();
      alert("Registro realizado com sucesso!");
      // Você pode redirecionar o usuário ou armazenar o token, se necessário

    } catch (error) {
      alert(error.message); // Alert de erro
      console.error('Erro ao realizar registro:', error);
    }
  }
};

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          
          <button type="submit" className="register-button">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
