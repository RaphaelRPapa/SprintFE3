import React from 'react';
import './ServicesPage.css';
import { useNavigate } from 'react-router-dom'; // Usar o hook para navegação

const services = [
  {
    title: "Renovação de CNH",
    description: "Renove sua carteira de motorista com rapidez e segurança.",
    link: "/booking"
  },
  {
    title: "Emplacamento de Veículos",
    description: "Serviço prático para emplacamento de veículos novos e usados.",
    link: "/booking"
  },
  {
    title: "Segunda Via de RG",
    description: "Obtenha a segunda via do seu RG sem complicações.",
    link: "/booking"
  },
  {
    title: "Alistamento Militar",
    description: "Faça o alistamento militar de forma rápida e eficiente.",
    link: "/booking"
  },
  {
    title: "Passaporte",
    description: "Solicite seu passaporte de forma simples e segura.",
    link: "/booking"
  }
];

const ServicesPage = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleServiceClick = (link) => {
    navigate(link); // Redireciona para a página de agendamento
  };

  return (
    <div className="services-page">
      <div className="services-container">
        <h1 className="services-title">Catálogo de Serviços</h1>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button 
                className="service-button" 
                onClick={() => handleServiceClick(service.link)}>
                Agendar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
