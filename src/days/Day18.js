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
            Objednejte dnes a nejpozději zítra dopoledne balíček odešleme.
            A navíc můžete využít dárkové balení zdarma! 🎄
          </p>

          <div className="sale-info-box">
            <p className="sale-info-text">
              Objednej dnes a máš jistotu, že dárek
              <span className="sale-info-highlight"> dorazí včas!</span>
            </p>
            <p className="sale-info-text">
              🎀 <span className="sale-info-highlight">+ dárkové balení zdarma</span>
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Nakoupit teď →
          </a>

          <div className="sale-validity">
            <span className="sale-validity-urgent">⚠️ Zítra, 19.12. už je úplně poslední termín pro odeslání.</span>
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