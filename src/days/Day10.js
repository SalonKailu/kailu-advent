import React from 'react';
import './DayVideo.css';

const Day10 = () => {
  const products = [
    {
      name: 'Poukaz 1000 Kč na e-shop',
      emoji: '🎁',
      url: 'https://www.kailushop.cz/poukaz-1000-kc-na-e-shop/'
    },
    {
      name: 'Set plátýnkových masek',
      emoji: '✨',
      url: 'https://www.kailushop.cz/set-platynkovych-masek/'
    },
    {
      name: 'Maska na rty',
      emoji: '💋',
      url: 'https://www.kailushop.cz/maska-na-rty/'
    }
  ];

  return (
    <>
      <div className="video-header">
        <span className="video-badge">🎬 Video tip</span>
        <h1 className="video-title">Dárky do 1000 Kč pro náročné</h1>
      </div>

      <div className="video-wrapper">
        <video 
          controls 
          playsInline
          poster=""
        >
          <source 
            src="https://www.kailushop.cz/user/documents/upload/advent/darky-1000.mp4" 
            type="video/mp4" 
          />
          Tvůj prohlížeč nepodporuje video.
        </video>
      </div>

      <div className="video-content">
        <p className="video-intro">
          Když chceš dát něco víc než drobnost. 
          Tahle trojice zaručeně nezklame – sama bych si ji přála.
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
          href="https://www.kailushop.cz/produkty/"
          className="video-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prohlédnout celý e-shop →
        </a>

        <div className="video-footer">
          <p>Nevíš co vybrat? Poukaz je vždy trefa do černého.</p>
        </div>
      </div>
    </>
  );
};

export default Day10;