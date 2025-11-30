import React from 'react';
import './DayVideo.css';

const Day17 = () => {
  return (
    <>
      <div className="video-header">
        <span className="video-badge">🎬 Osobní tip</span>
        <h1 className="video-title">Co letos dávám rodičům</h1>
      </div>

      <div className="video-wrapper">
        <video 
          controls 
          playsInline
          poster=""
        >
          <source 
            src="https://www.kailushop.cz/user/documents/upload/advent/darky-rodice.mp4" 
            type="video/mp4" 
          />
          Tvůj prohlížeč nepodporuje video.
        </video>
      </div>

      <div className="video-content">
        <p className="video-intro">
          Vánoce jsou za rohem a já mám konečně jasno. 
          Tady je můj seznam – třeba tě inspiruje.
        </p>

        <div className="family-section">
          <div className="family-member">
            <div className="family-label">
              <span className="family-label-emoji">👩</span>
              Pro mamku
            </div>
            <div className="family-products">
              <a 
                href="https://www.kailushop.cz/anti-age-sada-pro-mastnou-a-smisenou-plet/"
                className="family-product-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anti-age sada pro plet
              </a>
              <a 
                href="#"
                className="family-product-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Další dárek (doplním)
              </a>
            </div>
          </div>

          <div className="family-member">
            <div className="family-label">
              <span className="family-label-emoji">👨</span>
              Pro taťku
            </div>
            <div className="family-products">
              <a 
                href="#"
                className="family-product-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dárek č. 1 (doplním)
              </a>
              <a 
                href="#"
                className="family-product-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dárek č. 2 (doplním)
              </a>
            </div>
          </div>
        </div>

        <a 
          href="https://www.kailushop.cz/produkty/"
          className="video-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prohlédnout e-shop →
        </a>

        <div className="video-footer">
          <p>Někdy je nejlepší dárek čas strávený spolu. Ale drobnost potěší taky. 💝</p>
        </div>
      </div>
    </>
  );
};

export default Day17;