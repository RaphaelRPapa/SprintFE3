import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Altere o caminho conforme necessário
import './Navbar.css';

function Navbar() {
  const { user } = useAuth() || {}; // Adicionando fallback

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Cidadão Shopping</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Início</Link>
        <Link to="/services">Serviços</Link>
        <Link to="/booking">Agendar</Link>
        <Link to="/userbookings">Agendamentos</Link>
        <Link to="/contact">Contato</Link>
      </div>
      <div className="navbar-buttons">
        {user ? (
          <span>{user.name}</span> // Mostre o nome do usuário
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Registro</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
