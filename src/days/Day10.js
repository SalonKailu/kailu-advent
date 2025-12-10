import React from 'react';
import './DayBox.css';

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
      <div className="box-header">
        <span className="box-badge">🎁 Tip na dárek</span>
        <h1 className="box-title">Dárky do 1000 Kč</h1>
      </div>

      <div className="box-content">
        <p className="box-description">
          Když chceš dát něco víc než drobnost. 
          Tahle trojice zaručeně nezklame.
        </p>

        <div className="box-products">
          {products.map((product, index) => (
            <a 
              key={index}
              href={product.url}
              className="box-product-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="box-product-emoji">{product.emoji}</span>
              <span className="box-product-name">{product.name}</span>
            </a>
          ))}
        </div>

        <a 
          href="https://www.kailushop.cz/produkty/"
          className="box-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prohlédnout celý e-shop →
        </a>

        <div className="box-footer">
          <p>Nevíš co vybrat? Poukaz je vždy trefa do černého.</p>
        </div>
      </div>
    </>
  );
};

export default Day10;