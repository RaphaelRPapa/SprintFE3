import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="content">
      <div className="welcome-section">
        <h1>Bem-vindo ao Shopping Cidadão</h1>
        <p>
          Aqui você encontrará uma variedade de serviços disponíveis para facilitar
          seu dia a dia. Explore nossas opções e aproveite a praticidade que
          oferecemos.
        </p>
        <a href="/services" className="welcome-button">Saiba Mais</a>
      </div>

      <div className="features-section">
        <h2>Funcionalidades</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Fácil Acesso</h3>
            <p>Tenha acesso rápido a todos os nossos serviços com apenas alguns cliques.</p>
          </div>
          <div className="feature">
            <h3>Agendamentos Rápidos</h3>
            <p>Agende seu atendimento de forma rápida e prática, no horário que preferir.</p>
          </div>
          <div className="feature">
            <h3>Suporte Dedicado</h3>
            <p>Conte com nosso suporte especializado para resolver qualquer dúvida.</p>
          </div>
        </div>
      </div>

      <div className="reviews-section" id ="reviews">
        <h2>Avaliações de Clientes</h2>
        <div className="reviews-container">
          <div className="review-bubble">
            <strong>Maria Silva</strong>
            <p>"Ótimo atendimento e serviços rápidos. Recomendo!"</p>
          </div>
          <div className="review-bubble">
            <strong>João Pereira</strong>
            <p>"Facilidade na navegação e agendamento. Fiquei muito satisfeito!"</p>
          </div>
          <div className="review-bubble">
            <strong>Adam Smasher</strong>
            <p>"Recomendo a todos, atendimento de primeira!"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
