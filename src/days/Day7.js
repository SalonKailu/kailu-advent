import React, { useState } from 'react';
import './DaySale.css';

const Day7 = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('DAREK');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sale-container">
      <div className="sale-card">
        <div className="sale-header">
          <span className="sale-emoji">🎁</span>
          <h1 className="sale-title">Tajemný dárek k objednávce!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Co to bude? To je překvapení! ✨<br />
            Dárek přibalíme ke každé objednávce.
          </p>

          <div className="sale-code-box" onClick={copyCode}>
            <p className="sale-code-label">Použij kód při objednávce</p>
            <p className="sale-code">DAREK</p>
            <p className={`sale-code-hint ${copied ? 'sale-code-copied' : ''}`}>
              {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
            </p>
          </div>

          <a 
            href="https://www.kailushop.cz" 
            className="sale-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Nakoupit a získat dárek →
          </a>

          <div className="sale-validity">
            ⏰ Platí pouze dnes do půlnoci!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day7;