import React from 'react';
import './DaySale.css';

const Day14 = () => {
  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">✨</span>
          <h1 className="sale-title">Fixační gel 1+1 zdarma!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Kup jeden fixační gel na obočí a druhý dostaneš zdarma. 
            Pro sebe a pro kamarádku! 👯‍♀️
          </p>

          <div className="sale-info-box">
            <p className="sale-info-text">
              Perfektní obočí pro tebe i tvou kámošku!
              <span className="sale-info-highlight"> druhý gel zdarma!</span>
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz/fixacni-gel-na-oboci/" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Koupit fixační gel →
          </a>

          <div className="sale-validity">
            ⏰ Platí pouze dnes do půlnoci!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day14;