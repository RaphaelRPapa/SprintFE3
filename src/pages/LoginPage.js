// src/components/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Importar o contexto de autenticação
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth(); // Usar o contexto de autenticação
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // Chamar a função de login do contexto
        alert(data.message);
        // Redirecionar ou executar ações após login
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Erro ao realizar login.');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
