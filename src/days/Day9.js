import React from 'react';
import './DaySale.css';

const Day9 = () => {
  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">🎀</span>
          <h1 className="sale-title">Dárkové balení zdarma!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Každou dnešní objednávku zabalíme do krásného dárkového balení. 
            Žádný kód nepotřebuješ – balení přidáme automaticky! 🎄
          </p>

          <div className="sale-info-box">
            <p className="sale-info-text">
              Objednej cokoli a my to zabalíme
              <span className="sale-info-highlight"> jako dárek</span>
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Nakoupit s balením zdarma →
          </a>

          <div className="sale-validity">
            ⏰ Platí pouze dnes do půlnoci!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day9;