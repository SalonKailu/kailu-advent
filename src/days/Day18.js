import React from 'react';
import './DaySale.css';

const Day18 = () => {
  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">🚚</span>
          <h1 className="sale-title">Doručení do Vánoc bez stresu!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Objednejte dnes nebo zítra dopoledne.
          </p>

          <div className="sale-info-box">
  <p className="sale-info-text">
    Navíc pouze dnes můžete využít
    <a 
      href="https://www.kailushop.cz/darkove-baleni" 
      className="sale-info-highlight" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{textDecoration: 'none', cursor: 'pointer'}}
    > DÁRKOVÉ BALENÍ ZA KORUNU</a>
  </p>
</div>

          <a 
            href="https://www.kailushop.cz/tipy-na-darek" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Vybrat dárky →
          </a>

          <div className="sale-validity">
            <span className="sale-validity-urgent">⚠️ Večerní objednávky odešleme zítra, 19.12 -  to je úplně poslední termín pro Vánoční odeslání.</span>
          </div>

          <div className="sale-bonus">
            <p>💡 Nestíháš vybrat?</p>
            <p>Pořiď poukaz – doručíme okamžitě emailem!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day18;