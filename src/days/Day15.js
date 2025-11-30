import React, { useState } from 'react';
import './DayBox.css';

const Day15 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const correctAnswer = 'probiotic';

  const options = [
    { id: 'collagen', label: 'Kolagenový krém' },
    { id: 'probiotic', label: 'Probiotický noční krém' },
    { id: 'peptide', label: 'Peptidové sérum' }
  ];

  const handleSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setTimeout(() => setShowResult(true), 800);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('PROBIOKREM15');
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
              <p>
                Tento produkt pracuje s <span className="box-highlight">fermentovanými ingrediencemi</span> – 
                trendem, který ovládl korejskou kosmetiku. A věda mu dává za pravdu.
              </p>
              <p>
                Obsahuje <span className="box-highlight">probiotický filtrát z pupečníku asijského</span>, 
                který posiluje kožní bariéru a zklidňuje zánětlivé procesy. 
                Výzkumy ukazují, že probiotika pomáhají balancovat mikrobiom pleti.
              </p>
              <p>
                K tomu <span className="box-highlight">5% niacinamid</span> pro sjednocení tónu 
                a zjemnění pórů, ceramidy pro obnovu lipidové bariéry a kyselinu hyaluronovou pro hydrataci.
              </p>
              <p>
                Bambucké máslo a makadamiový olej zajišťují výživu bez pocitu těžkosti.
              </p>
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
                  Je to náš Probiotický noční krém! Fermentované ingredience, niacinamid 
                  a ceramidy pro pleť, která se ráno probudí odpočatá.
                </p>
                
                <div className="box-code-container" onClick={copyCode}>
                  <p className="box-code-label">Tvůj slevový kód</p>
                  <p className="box-code">PROBIOKREM15</p>
                  <p className={`box-code-hint ${copied ? 'box-code-copied' : ''}`}>
                    {copied ? '✓ Zkopírováno!' : 'Klikni pro zkopírování'}
                  </p>
                </div>

                <a 
                  href="https://www.kailushop.cz/probioticky-krem/"
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
                  Správná odpověď byl Probiotický noční krém.
                </p>
                <div className="box-correct-answer">
                  <p>
                    <strong>Fermentovaný filtrát z pupečníku</strong>, niacinamid a ceramidy 
                    pro posílení kožní bariéry a klidnější pleť.
                  </p>
                </div>
                <a 
                  href="https://www.kailushop.cz/probioticky-krem/"
                  className="box-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prohlédnout krém →
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