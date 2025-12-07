import React, { useState } from 'react';
import './DaySale.css';

const Day22 = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('LASTMINUTE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
     <>
        <div className="sale-header">
          <span className="sale-emoji">🎁</span>
          <h1 className="sale-title">Last minute dárek se slevou 10%!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Ještě nemáš dárek? 😱<br />
            Poukaz na nákup v eshopu doručíme okamžitě emailem!
          </p>

          <div className="sale-code-box" onClick={copyCode}>
            <p className="sale-code-label">Použij kód při objednávce</p>
            <p className="sale-code">LASTMINUTE10</p>
            <p className={`sale-code-hint ${copied ? 'sale-code-copied' : ''}`}>
              {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz/poukazy-eshop/" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Koupit poukaz →
          </a>

          <div className="sale-validity">
            📧 Doručíme ihned na email – ideální last minute dárek! Kód můžete využít až do 24.12. <p></p>
            <span className="sale-extended">Platnost poukazu je do 31.6.2026!</span>
          </div>

          <div className="sale-bonus">
            <p>🎄 Žádný stres, žádné čekání</p>
            <p>Obdarovaný si vybere sám, co chce!</p>
          </div>
    </div>
    </>
  );
};

export default Day22;