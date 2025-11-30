import React, { useState } from 'react';
import './Day21.css';

const Day21 = () => {
  const [answers, setAnswers] = useState({
    cleansing: null,
    toner: null,
    spf: null,
    nightCream: null,
    serum: null
  });
  const [showResult, setShowResult] = useState(false);
  const [proResponse, setProResponse] = useState(null);

  const products = [
    { id: 'cleansing', label: 'Čištění pleti', emoji: '🧴' },
    { id: 'toner', label: 'Tonizace', emoji: '💧' },
    { id: 'spf', label: 'Denní krém s SPF', emoji: '☀️' },
    { id: 'nightCream', label: 'Noční krém', emoji: '🌙' },
    { id: 'serum', label: 'Sérum', emoji: '✨' }
  ];

  const frequencies = [
    { id: 'daily', label: 'Denně' },
    { id: 'sometimes', label: 'Párkrát týdně' },
    { id: 'never', label: 'Nikdy' }
  ];

  const handleSelect = (productId, frequencyId) => {
    setAnswers(prev => ({ ...prev, [productId]: frequencyId }));
  };

  const allAnswered = Object.values(answers).every(a => a !== null);

  const getResolution = () => {
    const { cleansing, toner, spf, nightCream, serum } = answers;

    // Priorita 1: SPF = NIKDY
    if (spf === 'never') {
      return {
        emoji: '☀️',
        title: 'Vaše předsevzetí: Chránit pleť a stárnout pomaleji!',
        text: 'UV záření způsobuje až 80 % viditelného stárnutí pleti – vrásky, pigmentové skvrny i ztrátu pružnosti. A to i v zimě, protože UVA záření projde i přes mraky. SPF není jen na léto, je to celoroční nutnost.',
        primaryLink: 'https://www.kailushop.cz/dennikremy/',
        primaryText: 'Vybrat denní krém s SPF',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 2: Čištění = NIKDY nebo PÁRKRÁT
    if (cleansing === 'never' || cleansing === 'sometimes') {
      return {
        emoji: '🧴',
        title: 'Vaše předsevzetí: Čistit pleť každý den!',
        text: 'Bez důkladného čištění je veškerá další péče zbytečná. Nečistoty, make-up a kožní maz ucpávají póry a brání vstřebávání aktivních látek. Frekvenci volte podle typu pleti.',
        primaryLink: 'https://www.kailushop.cz/cistenipleti/',
        primaryText: 'Vybrat čištění',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 3: SPF = PÁRKRÁT
    if (spf === 'sometimes') {
      return {
        emoji: '🛡️',
        title: 'Vaše předsevzetí: Chránit pleť každý den!',
        text: 'Občasná ochrana nestačí. UV paprsky na pleť působí denně – i když je zataženo, i přes okno. A navíc - naše denní krémy nejsou jen UV ochrana proti stárnutí a pigmentaci. Obsahují i další hydratační a zklidňující aktivní látky.',
        primaryLink: 'https://www.kailushop.cz/dennikremy/',
        primaryText: 'Vybrat denní krém s SPF',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 4: Noční = NIKDY
    if (nightCream === 'never') {
      return {
        emoji: '🌙',
        title: 'Vaše předsevzetí: Přidat noční péči!',
        text: 'V noci se pleť regeneruje až 3× rychleji než ve dne. Noční krém podporuje tento proces a dodává látky, které přes den pod make-upem nebo SPF nemají šanci působit.',
        primaryLink: 'https://www.kailushop.cz/nocnikremy/',
        primaryText: 'Vybrat noční krém',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 5: Noční = PÁRKRÁT
    if (nightCream === 'sometimes') {
      return {
        emoji: '🌙',
        title: 'Vaše předsevzetí: Noční krém každý večer!',
        text: 'Regenerace pleti probíhá každou noc – ne jen občas. Pravidelná noční péče znamená viditelně odpočatější a zdravější pleť.',
        primaryLink: 'https://www.kailushop.cz/nocnikremy/',
        primaryText: 'Vybrat noční krém',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 6: Tonizace = NIKDY nebo PÁRKRÁT
    if (toner === 'never' || toner === 'sometimes') {
      return {
        emoji: '💧',
        title: 'Vaše předsevzetí: Začít s tonizací!',
        text: 'Tonikum uzavírá čištění, obnovuje pH pleti a připravuje ji na vstřebání dalších produktů. Je to mezikrok, který dělá zbytek rutiny efektivnější.',
        primaryLink: 'https://www.kailushop.cz/cistenipleti/',
        primaryText: 'Vybrat tonikum',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 7: Sérum = NIKDY
    if (serum === 'never') {
      return {
        emoji: '✨',
        title: 'Vaše předsevzetí: Objevit sílu séra!',
        text: 'Séra obsahují nejvyšší koncentrace aktivních látek. Když už máte základy v pořádku, sérum je další level – cílí přesně tam, kde to pleť potřebuje.',
        primaryLink: 'https://www.kailushop.cz/sera/',
        primaryText: 'Vybrat sérum',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 8: Sérum = PÁRKRÁT
    if (serum === 'sometimes') {
      return {
        emoji: '✨',
        title: 'Wow, vy jste boží! Vaše předsevzetí je neměnit to! 😁',
        text: 'Pokud byste chtěla vaši rutinu "vyšperkovat" k dokonalosti, můžete začít sérum používat denně. Pokud není s mikrojehličkami! V tom případě můžete ve dny mezi sérem používat séerum jiné - hydratační nebo zklidňující.',
        primaryLink: 'https://www.kailushop.cz/sera/',
        primaryText: 'Kouknout na séra',
        showQuiz: true,
        showChallenge: true
      };
    }

    // Priorita 9: VŠE DENNĚ = Profík
    return {
      emoji: '🏆',
      title: 'Wow! Vaše rutina je skvělá! Vaše předsevzetí je NEPOLEVIT a užívat si výsledky! ♥',
      text: 'Máte základy naprosto v pořádku. Teď můžete experimentovat s maskami pro extra péči podle aktuálního stavu pleti.',
      primaryLink: 'https://www.kailushop.cz/masky/',
      primaryText: 'Prozkoumat masky',
      showQuiz: false,
      showChallenge: false,
      isPro: true
    };
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const resolution = showResult ? getResolution() : null;

  return (
    <>
      <div className="resolution-header">
        <span className="resolution-badge">🎯 Nový rok 2025</span>
        <h1 className="resolution-title">Jaké bude vaše skincare předsevzetí?</h1>
      </div>

      <div className="resolution-content">
        {!showResult ? (
          <>
            <p className="resolution-intro">
              vyberte, jak často děláte tyto kroky:
            </p>

            <div className="resolution-products">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className={`resolution-product ${answers[product.id] ? 'answered' : ''}`}
                >
                  <div className="product-label">
                    <span className="product-label-emoji">{product.emoji}</span>
                    {product.label}
                  </div>
                  <div className="frequency-options">
                    {frequencies.map(freq => (
                      <button
                        key={freq.id}
                        className={`frequency-btn ${freq.id} ${answers[product.id] === freq.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(product.id, freq.id)}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="resolution-submit"
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              {allAnswered ? 'Zobrazit mé předsevzetí →' : 'Odpovězte na všechny otázky'}
            </button>
          </>
        ) : (
          <div className="resolution-result">
            <div className="result-card">
              <div className="result-emoji">{resolution.emoji}</div>
              <h2 className="result-title">{resolution.title}</h2>
              <p className="result-text">{resolution.text}</p>

              <div className="result-links">
                <a 
                  href={resolution.primaryLink}
                  className="result-link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resolution.primaryText}
                </a>

                {resolution.showQuiz && (
                  <a 
                    href="https://kailu-kviz.vercel.app/"
                    className="result-link-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nevím, jaký mám typ pleti →
                  </a>
                )}

                {resolution.showChallenge && (
                  <a 
                    href="https://www.kailushop.cz/lednovavyzva/"
                    className="result-link-challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💌 Chci 7denní skincare výzvu zdarma
                  </a>
                )}
              </div>

              {resolution.isPro && (
                <div className="pro-followup">
                  {proResponse === null ? (
                    <>
                      <p className="pro-question">Jste s výsledky své péče spokojená?</p>
                      <div className="pro-buttons">
                        <button 
                          className="pro-btn pro-btn-yes"
                          onClick={() => setProResponse('happy')}
                        >
                          Ano, jsem! 😊
                        </button>
                        <button 
                          className="pro-btn pro-btn-no"
                          onClick={() => setProResponse('help')}
                        >
                          Mohlo by to být lepší
                        </button>
                      </div>
                    </>
                  ) : proResponse === 'happy' ? (
                    <div className="pro-response happy">
                      <p>🎉 Skvělé! Jen tak dál – vaše pleť vám děkuje!</p>
                    </div>
                  ) : (
                    <div className="pro-response help">
                      <p>Možná je čas na změnu produktů nebo rutiny. Náš kvíz vám pomůže najít, co vaší pleti opravdu sedí.</p>
                      <a 
                        href="https://kailu-kviz.vercel.app/"
                        className="result-link-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Zjistit, co mi chybí →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Day21;




