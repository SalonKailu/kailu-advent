import React, { useState } from 'react';
import './DayBox.css';

const Day12 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const correctAnswer = 'peptidy';

  const options = [
    { id: 'vitamin-c', label: 'Sérum s vitamínem C' },
    { id: 'peptidy', label: 'Peptidové sérum' },
    { id: 'hyaluron', label: 'Kyselina hyaluronová' }
  ];

  const handleSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setTimeout(() => setShowResult(true), 800);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('PEPTIDY15');
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
                <li>🧬 <strong>Palmitoylové peptidy</strong> stimulují syntézu kolagenu a redukují vrásky</li>
                <li>💧 <strong>Hydrolyzovaná kyselina hyaluronová</strong> – menší molekuly pronikají hlouběji a hydratují zevnitř</li>
                <li>🌿 <strong>Centella Asiatica</strong> zklidňuje a podporuje přirozenou regeneraci</li>
                <li>✨ <strong>Adenosin</strong> zlepšuje elasticitu pleti</li>
                <li>🛡️ <strong>Panthenol</strong> (provitamin B5) podporuje hojení a zklidnění</li>
                <li>👋 <strong>Spikule - mořské mikrojehličky</strong> díky kterým aktivní látky proniknou 2x hlouběji</li>
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
                  Ano, je to naše Peptidové sérum! Kombinace palmitoylových peptidů, 
                  hydrolyzované kyseliny hyaluronové a Centella Asiatica pro viditelné omládnutí pleti.
                </p>
                
                <div className="box-code-container" onClick={copyCode}>
                  <p className="box-code-label">Tvůj slevový kód</p>
                  <p className="box-code">PEPTIDY15</p>
                  <p className={`box-code-hint ${copied ? 'box-code-copied' : ''}`}>
                    {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
                  </p>
                </div>

                <a 
                  href="https://www.kailushop.cz/peptidove-serum/"
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
                  Správná odpověď bylo Peptidové sérum.
                </p>
                <div className="box-correct-answer">
                  <p>
                    Kombinace <strong>palmitoylových peptidů, hydrolyzované kyseliny hyaluronové 
                    a Centella Asiatica</strong> pro viditelné omládnutí pleti.
                  </p>
                </div>
                <a 
                  href="https://www.kailushop.cz/peptidove-serum/"
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