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
          <h1 className="sale-title">Podruhé a naposledy. 😁🤶<br/>Poukaz do salonu se slevou 10%!</h1>
        </div>

        <div className="sale-content">
          <p className="sale-subtitle">
            Daruj zážitek! 💝<br />
            Poukaz na kosmetické ošetření v Salonu Kailu. 
            Doručíme okamžitě emailem.
          </p>

        

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
          
          </div>

          <div className="sale-bonus">
            <p>📍 Salon Kailu, Brno-Lesná</p>
            <p>Ideální dárek pro maminku, kamarádku nebo sebe</p>
             <p><span className="sale-extended">Paltnost poukazu je do 30.6.2026</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day19;