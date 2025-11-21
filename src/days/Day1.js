import React, { useState } from 'react';
import './Day1.css';
import ScratchCard from './ScratchCard';
import { saveEmailToNewsletter } from '../apiService';

function Day1({ onClose }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [gameState, setGameState] = useState('form'); // form / scratch / prize
  const [scratchNumbers, setScratchNumbers] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [prize, setPrize] = useState(null);

  // Generování čísel pro los
  const generateScratchNumbers = () => {
    const wonPrize = getRandomPrize();
    
    // Vygeneruj 7 čísel - 3× výherní částka + 4× náhodné jiné
    const numbers = [
      wonPrize.amount,
      wonPrize.amount,
      wonPrize.amount
    ];
    
    // Přidej 4 náhodné jiné částky
    const otherAmounts = [100, 200, 300, 400, 500].filter(x => x !== wonPrize.amount);
    for (let i = 0; i < 4; i++) {
      numbers.push(otherAmounts[Math.floor(Math.random() * otherAmounts.length)]);
    }
    
    // Zamíchej
    return numbers.sort(() => Math.random() - 0.5);
  };

  // Funkce pro náhodnou výhru
  const getRandomPrize = () => {
    const random = Math.random() * 100;
    
    if (random < 45) return { amount: 100, minPurchase: 500 };
    if (random < 80) return { amount: 200, minPurchase: 700 };
    if (random < 95) return { amount: 300, minPurchase: 1000 };
    if (random < 99) return { amount: 400, minPurchase: 1000 };
    return { amount: 500, minPurchase: 1000 };
  };

  // Generování kódu s pevnými, ale pro každou částku unikátními sufixy
const generateCode = (amount) => {
    // Definice pevných, ale unikátních sufixů
    // Tuto mapu bys měl používat i pro ověření na svém e-shopu!
    const uniqueSuffixes = {
        100: 'QJ3', 
        200: 'XF9',
        300: 'LK5',
        400: 'RM2',
        500: 'PZ7',
    };

    const suffix = uniqueSuffixes[amount] || 'ERR'; 

    // Formát: KA + Částka + Sufix
    return `KA${amount}${suffix}`;
};

  // Spuštění hry
  const handlePlay = () => {
    if (!email || !consent) {
      alert('Prosím vyplň email a souhlas s podmínkami');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Prosím zadej platný email');
      return;
    }

// -----------------------------------------------------------------
    // NOVÉ: VOLANIE CENTRÁLNEJ FUNKCIE PRE UKLADANIE DO GOOGLE SHEETS
    // -----------------------------------------------------------------
    // Uloží e-mail, súhlas a zdroj ('Kailu_Advent_Kviz_Den_1') do Tabuľky Google
    saveEmailToNewsletter(email, consent, 'Kailu_Advent_Kviz_Den_1'); 

    // Pôvodné uloženie emailu do lokálneho úložiska (ponechávame pre lokálnu kontrolu hry)
    const existingEmails = JSON.parse(localStorage.getItem('adventEmails') || '[]');
    existingEmails.push({
      email: email,
      day: 1,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('adventEmails', JSON.stringify(existingEmails));

    // Vygeneruj čísla pro škrábání
    const numbers = generateScratchNumbers();
    setScratchNumbers(numbers);
    setRevealed(Array(7).fill(false));
    setGameState('scratch');
  };

// Odkrytí políčka
const handleReveal = (index) => {
  if (revealed[index]) return;
  
  // Animovaný delay
  setTimeout(() => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    // Zkontroluj, jestli má 3 stejné
    const revealedNumbers = scratchNumbers.filter((_, i) => newRevealed[i]);
    
    const counts = {};
    revealedNumbers.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });

    Object.keys(counts).forEach(amount => {
      if (counts[amount] >= 3) {
        const wonAmount = parseInt(amount);
        const wonPrize = {
          amount: wonAmount,
          minPurchase: wonAmount <= 200 ? 500 : 1000,
          code: generateCode(wonAmount)
        };

        setPrize(wonPrize);

        const prizes = JSON.parse(localStorage.getItem('adventPrizes') || '[]');
        prizes.push({
          email: email,
          day: 1,
          prize: wonAmount,
          code: wonPrize.code,
          minPurchase: wonPrize.minPurchase,
          timestamp: new Date().toISOString(),
          used: false
        });
        localStorage.setItem('adventPrizes', JSON.stringify(prizes));

        // Počkej než doskrábou VŠE!
        // (Zkontroluj jestli mají všechna políčka odkrytá)
        const allRevealed = newRevealed.every(r => r === true);
        
        if (allRevealed) {
          // Všechno odkryté → ukaž výhru po 1 sekundě
          setTimeout(() => {
            setGameState('prize');
          }, 1000);
        } else {
          // Ještě ne všechno → ukaž hint
          // (můžeme přidat pulsující text "Máš to! Ale pro jistotu doškrábej i zbylá políčka!")
        }
      }
    });
  }, 300); // 300ms delay = efekt "škrábání"
};

  // Zkopírování kódu
  const copyCode = () => {
    navigator.clipboard.writeText(prize.code);
    alert('Kód zkopírován! ✅');
  };

  return (
    <div className="day1-container">
      <button className="close-btn" onClick={onClose}>✕</button>
      
      {gameState === 'form' && (
        // FORMULÁŘ
        <div className="day1-form">
          <h1>🎄 Vánoční los</h1>
          <p className="subtitle">Najdi tři stejné částky a vyhraj!</p>
          
          <div className="form-group">
            <label>📧 Zadej email pro tvůj slevový kód:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tvuj@email.cz"
              className="email-input"
            />
          </div>

          <div className="consent-group">
            <label className="consent-label">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                Souhlasím s{' '}
                <a 
                  href="https://www.kailushop.cz/podminky-advent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  podmínkami hry
                </a>
                {' '}a se zasíláním obchodních sdělení (newsletteru) emailem
              </span>
            </label>
          </div>

          <button 
            className="play-btn"
            onClick={handlePlay}
            disabled={!email || !consent}
          >
            🎁 HRÁT
          </button>

        
        </div>
      )}

      {gameState === 'scratch' && (
        // ŠKRÁBACÍ LOS
        <div className="day1-scratch">
          <h1>🎰 NAJDI TŘI STEJNÉ A VYHRAJ!</h1>
          <p className="scratch-subtitle">Klikni na políčka a odkryj částky</p>
          
          <div className="scratch-grid">
  {scratchNumbers.map((number, index) => (
    <ScratchCard
      key={index}
      number={number}
      onReveal={() => handleReveal(index)}
      isRevealed={revealed[index]}
    />
  ))}
</div>

          <p className="scratch-hint">💡 Potřebuješ odkrýt 3 stejné částky</p>
        </div>
      )}

      {gameState === 'prize' && prize && (
        // VÝHRA
        <div className="day1-prize">
          <h1>🎉 GRATULUJEME!</h1>
          <p className="prize-text">Právě jsi vyhrála <strong>{prize.amount} Kč</strong> slevu a tajný dárek k dnešní objednávce!🤫</p>
          
          <div className="code-box">
            <div className="code">{prize.code}</div>
            <button className="copy-btn" onClick={copyCode}>
              📋 Zkopírovat kód
            </button>
          </div>

          <div className="prize-info">
            <p>💝 Platí na nákup nad {prize.minPurchase} Kč</p>
            <p>⏰ Kód vyprší dnes o půlnoci</p>
          </div>

          <a 
            href="https://www.kailushop.cz" 
            className="shop-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            🛍️ NAKOUPIT TEĎ
          </a>

          
        </div>
      )}
    </div>
  );
}
export default Day1;