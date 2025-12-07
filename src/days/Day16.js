import React from 'react';
import './DaySale.css';

const Day16 = () => {
  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">☀️</span>
          <h1 className="sale-title">Hydratační SPF krém 1+1 zdarma!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Ochranu před UV zářením potřebujeme i v zimě! ❄️<br />
            Kup jeden krém a druhý dostaneš zdarma.
          </p>

          <div className="sale-info-box">
            <p className="sale-info-text">
              Hydratační krém SPF 50 –
              <span className="sale-info-highlight"> druhý kousek zdarma!</span>
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz/hydratacni-krem-spf-50/" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Koupit SPF krém →
          </a>

          <div className="sale-validity">
            ⏰ Platí pouze dnes do půlnoci!
          </div>

          <div className="sale-bonus">
            <p>💡 Věděla jsi?</p>
            <p>UVA paprsky (to jsou ty, které způsobují stárnutí) pronikají i přes mraky!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day16;