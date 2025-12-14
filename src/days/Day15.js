import React, { useState } from 'react';
import './DayBox.css';

const Day15 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const correctAnswer = 'probiotic';

  const options = [
    { id: 'collagen', label: 'Kolagenové sérum' },
    { id: 'probiotic', label: 'Probiotické sérum' },
    { id: 'peptide', label: 'Peptidové sérum' }
  ];

  const handleSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setTimeout(() => setShowResult(true), 800);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('PROBIO15');
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
          <li>🌿 <strong>Komplex Centella Asiatica</strong> – madecassic acid, asiaticoside a asiatic acid pro maximální zklidnění</li>
          <li>🛡️ <strong>Ceramidy NP</strong> – obnovují a posilují přirozenou ochrannou bariéru</li>
          <li>✨ <strong>Niacinamid</strong> – zklidňuje a sjednocuje tón pleti</li>
          <li>🧈 <strong>Makadamiový olej</strong> – výživa a hydratace bez mastného pocitu</li>
          <li>💧 <strong>Polyglutamová kyselina</strong> – intenzivní dlouhotrvající hydratace</li>
          <li>🧫 <strong>Lactobacillus Ferment</strong> – probiotická složka pro zdravý mikrobiom</li>
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
              {isWin ? 'Přesně tak! Znáš se.' : 'Škoda, tentokrát ne...'}
            </h2>
            
            {isWin ? (
              <>
                <p className="box-result-text">
                  Je to naše Probiotické sérum! Komplex Centella Asiatica, ceramidy 
                  a polyglutamová kyselina pro zklidněnou a dokonale hydratovanou pleť.
                </p>
                
                <div className="box-code-container" onClick={copyCode}>
                  <p className="box-code-label">Tvůj slevový kód</p>
                  <p className="box-code">PROBIO15</p>
                  <p className={`box-code-hint ${copied ? 'box-code-copied' : ''}`}>
                    {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
                  </p>
                </div>

                <a 
                  href="https://www.kailushop.cz/probioticke-serum/"
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
                  Správná odpověď bylo Probiotické sérum.
                </p>
                <div className="box-correct-answer">
                  <p>
                    <strong>Komplex Centella Asiatica</strong>, ceramidy NP a polyglutamová kyselina 
                    pro zklidnění a intenzivní hydrataci pleti.
                  </p>
                </div>
                <a 
                  href="https://www.kailushop.cz/probioticke-serum/"
                  className="box-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prohlédnout sérum →
                </a>
              </>
            )}

            <div className="box-footer">
              <p>{isWin ? 'Sleva platí pouze dnes do půlnoci!' : 'Zítra je nový den!'}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Day15;