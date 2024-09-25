import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Suporte</h1>
        <p>Bem-vindo ao nosso centro de suporte! Aqui você encontrará informações para obter ajuda e suporte para qualquer questão relacionada aos nossos serviços.</p>
        
        <h2>Entre em Contato</h2>
        <p>Para suporte imediato, entre em contato conosco pelos seguintes meios:</p>
        <ul>
          <li>Email: <a href="mailto:suporte@cidadaoshopping.com">suporte@cidadaoshopping.com</a></li>
          <li>Telefone: <a href="tel:+55011960842354">+55 011 96084-2354</a></li>
          <li>Chat ao Vivo: Disponível em breve</li>
        </ul>
        
        <h2>Horário de Atendimento</h2>
        <p>Nossa equipe de suporte está disponível de segunda a sexta-feira, das 9h às 18h, horário local.</p>
      </div>
    </div>
  );
};

export default ContactPage;
