import React from 'react';
import './DayVideo.css';

const Day6 = () => {
  const products = [
    {
      name: 'Fixační gel na obočí',
      emoji: '✨',
      url: 'https://www.kailushop.cz/fixacni-gel-na-oboci/'
    },
    {
      name: 'Saténová scrunchie',
      emoji: '🎀',
      url: 'https://www.kailushop.cz/satenova-gumicka-scrunchie/'
    },
    {
      name: 'Plátýnková maska',
      emoji: '🧖‍♀️',
      url: 'https://www.kailushop.cz/maska-s-pdrn/'
    }
  ];

  return (
    <>
      <div className="video-header">
        <span className="video-badge">🎬 Video tip</span>
        <h1 className="video-title">Dárky do 300 Kč, které potěší</h1>
      </div>

      <div className="video-wrapper">
        <video 
          controls 
          playsInline
          poster=""
        >
          <source 
            src="https://www.kailushop.cz/user/documents/upload/advent/darky-300.mp4" 
            type="video/mp4" 
          />
          Tvůj prohlížeč nepodporuje video.
        </video>
      </div>

      <div className="video-content">
        <p className="video-intro">
          Hledáš drobnost, která udělá radost a nepůsobí lacině? 
          Tyhle tři kousky jsou moje ověřené tipy – sama je rozdávám.
        </p>

        <div className="video-products">
          <p className="video-products-title">Z videa</p>
          <div className="products-grid">
            {products.map((product, index) => (
              <a 
                key={index}
                href={product.url}
                className="product-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="product-emoji">{product.emoji}</span>
                <span className="product-name">{product.name}</span>
              </a>
            ))}
          </div>
        </div>

        <a 
          href="https://www.kailushop.cz/produkty/?order=price"
          className="video-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zobrazit vše od nejlevnějšího →
        </a>

        <div className="video-footer">
          <p>Všechny produkty skladem, doručíme do 2 dnů</p>
        </div>
      </div>
    </>
  );
};

export default Day6;