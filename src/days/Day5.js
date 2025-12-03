import React from 'react';
import './Day5.css';

const Day5 = () => {
  return (
    <div className="day5-container">
      <div className="day5-content">
        <div className="day5-header">
          <span className="day5-icon">🚚</span>
          <h1 className="day5-title">Doprava ZDARMA!</h1>
          <p className="day5-subtitle">Bez minimální částky nákupu</p>
        </div>
        
        <div className="day5-offer-box">
          <div className="day5-highlight">
            <span className="original-price">Běžně od 1500 Kč</span>
            <span className="today-price">DNES bez limitu</span>
          </div>
          
          <div className="day5-info">
            <h3>✨ Platí na všechny objednávky</h3>
            <ul>
              <li>Zásilkovna - ZDARMA</li>
              <li>Balíkovna - ZDARMA</li>
              <li>PPL - ZDARMA</li>
              <li>Osobní odběr Brno - ZDARMA (jako vždy 😉)</li>
            </ul>
          </div>

          <div className="day5-code-box">
            <p>Při objednávce použijte kód:</p>
            <div className="day5-code">DOPRAVA0</div>
            <p className="day5-validity">Platí pouze dnes do 23:59!</p>
          </div>
        </div>

        <div className="day5-cta">
          <p className="day5-motivation">
            Ideální příležitost vyzkoušet naše produkty<br/>
            nebo dokoupit dárky pod stromeček! 🎁
          </p>
          
          <a 
            href="https://www.kailushop.cz" 
            className="day5-shop-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            NAKUPOVAT
          </a>
        </div>

        <div className="day5-benefits">
          <div className="benefit">
            <span className="benefit-icon">📦</span>
            <span>Expedice do 24h</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎄</span>
            <span>95% balíčků doručeno do 2 dnů</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon">💝</span>
            <span>Možnost přidat dárkové balení k většině produktů</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day5;