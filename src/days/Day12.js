import React, { useState } from 'react';
import './DayBox.css';

const Day12 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const correctAnswer = 'retinol';

  const options = [
    { id: 'vitamin-c', label: 'Sérum s vitamínem C' },
    { id: 'retinol', label: 'Retinolové sérum' },
    { id: 'hyaluron', label: 'Kyselina hyaluronová' }
  ];

  const handleSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setTimeout(() => setShowResult(true), 800);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('RETINOL15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWin = selectedAnswer === correctAnswer;

  return (
    <>
      <div className="box-header">
        <span className="box-badge">🎁 Hádej a vyhraj</span>
        <h1 className="box-title">Co je v krabici?</h1>
      </div>

      <div className="box-content">
        {!showResult ? (
          <>
            <div className="box-description">
  <ul className="box-benefits">
    <li>🔬 <strong>40+ let vědeckého výzkumu</strong> potvrzuje účinnost této ingredience</li>
    <li>✨ <strong>Stimuluje</strong> tvorbu kolagenu</li>
    <li>🔄 <strong>Urychluje</strong> obnovu buněk</li>
    <li>📏 <strong>Vyhlazuje</strong> jemné vrásky (viditelně už po 12 týdnech!)</li>
    <li>🧪 Obsahuje mořské spikule – přírodní mikroskopické jehličky, díky kterým aktivní látky pronikají <strong>2× hlouběji</strong></li>
    <li>👋 A co je skvělé? Máme ho v nabídce a spoustu z vás už ho zbožňuje.</li>
  </ul>

</div>

            <div className="box-question">
              <p className="box-question-text">O jaký produkt se jedná?</p>
            </div>

            <div className="box-options">
              {options.map((option) => (
                <button
                  key={option.id}
                  className={`box-option ${
                    selectedAnswer === option.id
                      ? option.id === correctAnswer
                        ? 'correct'
                        : 'wrong'
                      : selectedAnswer
                      ? 'disabled'
                      : ''
                  }`}
                  onClick={() => !selectedAnswer && handleSelect(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={`box-result ${isWin ? 'win' : 'lose'}`}>
            <div className="box-result-emoji">{isWin ? '🎉' : '😔'}</div>
            <h2 className="box-result-title">
              {isWin ? 'Správně! Máš oko na kvalitu.' : 'Bohužel, tentokrát ne...'}
            </h2>
            
            {isWin ? (
              <>
                <p className="box-result-text">
                  Ano, je to naše Retinolové sérum! Kombinace retinolu, retinalu a mořských spikul 
                  pro maximální účinek bez zbytečného dráždění.
                </p>
                
                <div className="box-code-container" onClick={copyCode}>
                  <p className="box-code-label">Tvůj slevový kód</p>
                  <p className="box-code">RETINOL15</p>
                  <p className={`box-code-hint ${copied ? 'box-code-copied' : ''}`}>
                    {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
                  </p>
                </div>

                <a 
                  href="https://www.kailushop.cz/retinolove-serum/"
                  className="box-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Koupit se slevou 15% →
                </a>
              </>
            ) : (
              <>
                <p className="box-result-text">
                  Správná odpověď bylo Retinolové sérum.
                </p>
                <div className="box-correct-answer">
                  <p>
                    Kombinace <strong>retinolu, retinalu a mořských spikul</strong> pro 
                    viditelné výsledky.
                  </p>
                </div>
                <a 
                  href="https://www.kailushop.cz/retinolove-serum/"
                  className="box-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prohlédnout sérum →
                </a>
              </>
            )}

            <div className="box-footer">
              <p>{isWin ? 'Sleva platí pouze dnes do půlnoci!' : 'Příště to vyjde!'}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Day12;