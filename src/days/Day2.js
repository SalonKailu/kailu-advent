import React from 'react';
import './Day2.css';

const Day2 = () => {

  return (
    <div className="day2-container">
      <div className="day2-header">
        <p className="day2-subtitle">Dneska tu mám něco pro Brňačky! </p>
<h1 className="day2-title">10% sleva na poukaz 😍</h1>
        
      </div>

      <div className="day2-content">
          <a href="https://www.kailushop.cz/kosmetika-oboci-rasy/" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ textDecoration: 'none', display: 'block' }}>
            

<div className="day2-discount-code">
  <p>Nabídka platí pouze dnes!</p>
</div></a>

          <div className="day2-description">
            <h2>Na co lze poukaz využít?</h2>

            <div className="day2-features">
              <div className="day2-feature">
                <div className="feature-content">
                  <h3>Kosmetické ošetření</h3>
                  <p>včetně doporučení domácí péče</p>
                </div>
              </div>

              <div className="day2-feature">
                <div className="feature-content">
                  <h3>Úprava obočí a řas</h3>
                  <p>Lash lifting, laminace, barvení hennou...</p>
                </div>
              </div>

              <div className="day2-feature">
                <div className="feature-content">
                  <h3>Výhodné balíčky</h3>
                  <p>Kombinace ošetření dle vašeho výběru</p>
                </div>
              </div>

              <div className="day2-feature">
                <div className="feature-content">
                  <h3>Nákup produktů</h3>
                  <p>I v kombinaci ošetření + produkty. Pouze v salonu, ne na eshopu.</p>
                </div>
              </div></div>

              

            <div className="day2-location">
              <h3>📍 Kde zkrášlování probíhá?</h3>
              <p>Salon Kailu, Fillova 260/1, Brno Lesná</p>
              <p className="day2-duration">⏰ Délka ošetření: 30-120 minut</p>
            </div>
          </div>

          <a 
            href="https://www.kailushop.cz/kosmetika-oboci-rasy/" 
            className="day2-shop-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            KOUPIT POUKAZ SE SLEVOU
          </a>

<div className="day2-validity">
  📅 Poukaz je platný do 30.6.2026<br></br>
  💝 Ideální vánoční dárek pro maminku, dceru, kamarádku nebo i pro sebe. 😉
</div>
          
        </div>
    </div>
  );
};

export default Day2;