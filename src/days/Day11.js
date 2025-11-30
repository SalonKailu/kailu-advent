import React from 'react';
import './DaySale.css';

const Day11 = () => {
  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">💝</span>
          <h1 className="sale-title">Gumičky 1+1 zdarma!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Kup jedny gumičky a druhé dostaneš zdarma. 
            Pro sebe a pro kamarádku! 👯‍♀️
          </p>

          <div className="sale-info-box">
            <p className="sale-info-text">
              Vlož do košíku 2 balení gumiček –
              <span className="sale-info-highlight"> druhé je zdarma!</span>
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz/doplnky/" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Vybrat gumičky →
          </a>

          <div className="sale-validity">
            ⏰ Platí pouze dnes do půlnoci!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day11;