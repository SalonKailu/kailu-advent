import React, { useState } from 'react';
import './DaySale.css';

const Day19 = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('BRNACKY10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">💆‍♀️</span>
          <h1 className="sale-title">Poukaz do salonu se slevou 10%!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Daruj zážitek! 💝<br />
            Poukaz na kosmetické ošetření v Salonu Kailu. 
            Doručíme okamžitě emailem.
          </p>

          <div className="sale-code-box" onClick={copyCode}>
            <p className="sale-code-label">Použij kód při objednávce</p>
            <p className="sale-code">BRNACKY10</p>
            <p className={`sale-code-hint ${copied ? 'sale-code-copied' : ''}`}>
              {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz/kosmetika-oboci-rasy/" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Koupit poukaz →
          </a>

          <div className="sale-validity">
            📧 Doručíme ihned na email – stihneš i na poslední chvíli!
            <span className="sale-extended">Kód platí až do 24. 12.!</span>
          </div>

          <div className="sale-bonus">
            <p>📍 Salon Kailu, Brno-Lesná</p>
            <p>Ideální dárek pro maminku, kamarádku nebo sebe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day19;