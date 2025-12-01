import React, { useState, useEffect } from 'react';
import './Day1.css';
import ScratchCard from './ScratchCard';
import { saveEmailToNewsletter } from '../apiService';

function Day1({ onClose }) {
  const [gameState, setGameState] = useState('loading'); // loading / scratch / prize / already-played
  const [scratchNumbers, setScratchNumbers] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [prize, setPrize] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');

  // Kontrola při načtení - už hráli?
  useEffect(() => {
    const existingPrizes = JSON.parse(localStorage.getItem('adventPrizes') || '[]');
    const alreadyPlayedDay1 = existingPrizes.some(p => p.day === 1);

    if (alreadyPlayedDay1) {
      // Už hráli - najdi jejich výhru a ukaž ji
      const existingPrize = existingPrizes.find(p => p.day === 1);
      if (existingPrize) {
        setPrize({
          amount: existingPrize.prize,
          minPurchase: existingPrize.minPurchase,
          code: existingPrize.code
        });
        setGameState('already-played');
      }
    } else {
      // Ještě nehráli - spusť hru rovnou
      startGame();
    }
  }, []);

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
    const uniqueSuffixes = {
      100: 'QJ3', 
      200: 'XF9',
      300: 'LK5',
      400: 'RM2',
      500: 'PZ7',
    };

    const suffix = uniqueSuffixes[amount] || 'ERR'; 
    return `KA${amount}${suffix}`;
  };

  // Spuštění hry - nyní bez emailu
  const startGame = () => {
    const numbers = generateScratchNumbers();
    setScratchNumbers(numbers);
    setRevealed(Array(7).fill(false));
    setGameState('scratch');
  };

  // Odkrytí políčka
  const handleReveal = (index) => {
    if (revealed[index]) return;
    
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
            minPurchase: wonAmount === 100 ? 500 : (wonAmount === 200 ? 700 : 1000),
            code: generateCode(wonAmount)
          };

          setPrize(wonPrize);

          // Ulož výhru do localStorage (pro blokování opakované hry)
          const prizes = JSON.parse(localStorage.getItem('adventPrizes') || '[]');
          
          // Zkontroluj, jestli už není uložená (pro jistotu)
          const alreadySaved = prizes.some(p => p.day === 1);
          if (!alreadySaved) {
            prizes.push({
              day: 1,
              prize: wonAmount,
              code: wonPrize.code,
              minPurchase: wonPrize.minPurchase,
              timestamp: new Date().toISOString(),
              used: false
            });
            localStorage.setItem('adventPrizes', JSON.stringify(prizes));
          }

          // Zkontroluj jestli mají všechna políčka odkrytá
          const allRevealed = newRevealed.every(r => r === true);
          
          if (allRevealed) {
            setTimeout(() => {
              setGameState('prize');
            }, 1000);
          }
        }
      });
    }, 300);
  };

  // VYLEPŠENÉ kopírování kódu - funguje i v iframe
  const copyCode = async () => {
    const textToCopy = prize.code;
    
    try {
      // Metoda 1: Moderní Clipboard API s permissions
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopyMessage('✅ Kód zkopírován!');
        setTimeout(() => setCopyMessage(''), 3000);
        return;
      }
    } catch (err) {
      console.log('Clipboard API failed, trying fallback...');
    }

    // Metoda 2: Fallback pro iframe - vytvoří textové pole a zkopíruje
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      
      // Stylování aby nebylo vidět
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopyMessage('✅ Kód zkopírován!');
        setTimeout(() => setCopyMessage(''), 3000);
        return;
      }
    } catch (err) {
      console.log('Fallback copy failed');
    }

    // Metoda 3: Pokud nic nefunguje - ukaž kód k ručnímu zkopírování
    setCopyMessage('📋 Zkopíruj ručně: ' + textToCopy);
    
    // Vyber text v kódu pro snadné zkopírování
    const codeElement = document.querySelector('.code');
    if (codeElement && window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Loading state
  if (gameState === 'loading') {
    return (
      <div className="day1-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="loading">🎄 Načítám...</div>
      </div>
    );
  }

  return (
    <div className="day1-container">
      <button className="close-btn" onClick={onClose}>✕</button>

      {gameState === 'already-played' && prize && (
        // UŽ HRÁLI - UKAŽ JEJICH PŘEDCHOZÍ VÝHRU
        <div className="day1-prize">
          <h1>Už jsi hrál/a!</h1>
          <p className="prize-text">Tvoje výhra z dnešního dne: <strong>{prize.amount} Kč</strong></p>
          
          <div className="code-box">
            <div className="code">{prize.code}</div>
            <button className="copy-btn" onClick={copyCode}>
              📋 Zkopírovat kód
            </button>
            {copyMessage && <div className="copy-message">{copyMessage}</div>}
          </div>

          <div className="prize-info">
            <p>💝 Platí na nákup nad {prize.minPurchase} Kč</p>
            <p>⏰ Kód vyprší dnes o půlnoci</p>
            <p>🗓️ Zítra tě čeká nová hra!</p>
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

      {gameState === 'scratch' && (
        // ŠKRÁBACÍ LOS
        <div className="day1-scratch">
          <h1>NAJDI TŘI STEJNÉ A VYHRAJ!</h1>
          <p className="scratch-subtitle">"Seškrábni" políčka a objev částky</p>
          
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
            {copyMessage && <div className="copy-message">{copyMessage}</div>}
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