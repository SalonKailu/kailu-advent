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
    Kup jednu gumičku a druhou dostaneš zdarma.
  </p>
  <ul className="sale-list">
    <li>Pro sebe a pro kamarádku! 👯‍♀️</li>
    <li>Pro dva culíky / drdůlky (doporučuji mini velikost)</li>
    <li>Nebo jen tak do zásoby.</li>
  </ul>
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
  );
};

export default Day11;