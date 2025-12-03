import React, { useState, useEffect } from 'react';
import './Day4.css';

// --- KONSTANTA PRO ULOŽENÍ STAVU HRY ---
const LOCAL_STORAGE_KEY = 'kailuDay4Played';


// --- POMOCNÉ FUNKCE PRO HŘE ---

// Zjistí, zda se dnes již hrálo
const checkPlayedToday = () => {
    const played = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (played) {
        const playedData = JSON.parse(played);
        const today = new Date().toDateString();
        return playedData.date === today; 
    }
    return false;
};

// Získá uložený kód, pokud se dnes již hrálo
const getPlayedCode = () => {
    const played = localStorage.getItem(LOCAL_STORAGE_KEY);
    return played ? JSON.parse(played).code : null;
};

// Uloží stav jako "odehraný" a uloží vyhraný kód
const setPlayedDay = (code) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        date: new Date().toDateString(),
        code: code
    }));
};


// --- POMOCNÁ FUNKCE PRO NÁHODNÝ VÝBĚR VÝHRY ---
const getRandomPrize = (prizes) => {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < prizes.length; i++) {
        random -= prizes[i].probability;
        if (random <= 0) {
            return prizes[i];
        }
    }
    return prizes[0]; 
};


const Day4 = () => {
    // --- STAVY ---
    const [showForm, setShowForm] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [prize, setPrize] = useState(null); 
    const [alreadyPlayedPrize, setAlreadyPlayedPrize] = useState(null);
    const [alreadyPlayedCode, setAlreadyPlayedCode] = useState(null);


    // --- KONSTANTY VÝHER (včetně pravděpodobnosti, URL a fotky) ---
    const PRIZES = [
        { 
            name: 'Kailu Gumičku (Scrunchie)', 
            code: 'KRAGUM', 
            minPurchase: '300 Kč', 
            probability: 0.70,
            imageUrl: 'https://www.kailushop.cz/user/documents/upload/ostatní_ulozene/gumicky_bestseller.jpg', 
            productUrl: 'https://www.kailushop.cz/satenova-gumicka-scrunchie/'
        }, 
        { 
            name: 'Balzám na rty', 
            code: 'KRABAL', 
            minPurchase: '300 Kč', 
            probability: 0.25,
            imageUrl: 'https://www.kailushop.cz/user/documents/upload/ostatní_ulozene/balzam.jpg', 
            productUrl: 'https://www.kailushop.cz/balzam-na-rty-2/'
        }, 
        { 
            name: 'Fixační gel', 
            code: 'KRAGEL', 
            minPurchase: '500 Kč', 
            probability: 0.05,
            imageUrl: 'https://www.kailushop.cz/user/documents/upload/ostatní_ulozene/gelnaoboci_bestseller.jpg', 
            productUrl: 'https://www.kailushop.cz/fixacni-gel-na-oboci/'
        },    
    ];


    // --- KONTROLA, ZDA SE UŽ DNES HRÁLO (ONCE ON LOAD) ---
    useEffect(() => {
        if (checkPlayedToday()) {
            const storedCode = getPlayedCode();
            if (storedCode) {
                const foundPrize = PRIZES.find(p => p.code === storedCode);
                setAlreadyPlayedPrize(foundPrize ? foundPrize.name : 'Tvůj dárek');
                setAlreadyPlayedCode(storedCode);
            }
            setShowForm(false);
            setShowResult(true);
        }
    }, []);


    // --- KOPÍROVÁNÍ KÓDU ---
    const copyCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Kód zkopírován! 📋');
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Kód zkopírován! 📋');
        });
    };


    // --- LOGIKA KLIKNUTÍ NA KRABIČKU ---
    const handleBoxClick = (e) => {
        e.preventDefault();

        if (checkPlayedToday()) {
            alert('Dnes už jsi si krabičku vybral/a. Vrať se zítra pro novou výzvu!');
            return;
        }

        // Náhodný výběr výhry
        const selectedPrize = getRandomPrize(PRIZES);
        
        // Uložení stavu
        setPlayedDay(selectedPrize.code);
        
        // Zobrazení výsledku
        setPrize(selectedPrize);
        setShowForm(false);
        setShowResult(true);
    };


    return (
        <div className="day-container day-4">
            <h2>Mikulášská nadílka! 🎅</h2>
            <p className="day-description">
                Který z dárečků si vyberete?
            </p>

            {/* --- ZOBRAZENÍ PŘED HRANÍM --- */}
            {showForm && (
                <div className="box-selection-area">
                    <p>Kliknutím na krabičku odhalíš svůj dárek:</p>
                    <div className="boxes-wrapper">
                        <button className="gift-box" onClick={handleBoxClick}>
                            🎅
                        </button>
                        <button className="gift-box" onClick={handleBoxClick}>
                            🎁
                        </button>
                        <button className="gift-box" onClick={handleBoxClick}>
                            🎀
                        </button>
                    </div>
                    <small className="info-text">Vyberte si jen jednu! Ostatní zůstanou zavřené.</small>
                </div>
            )}

            {/* --- ZOBRAZENÍ VÝSLEDKU --- */}
            {showResult && (
                <div className="result-panel">
                    <h3>{alreadyPlayedCode ? 'Už sis vybral/a' : '🎉 Gratulujeme!'}</h3>
                    
                    <div className="prize-info">
                        {(prize || alreadyPlayedPrize) && (
                            <img 
                                src={prize ? prize.imageUrl : PRIZES.find(p => p.code === alreadyPlayedCode)?.imageUrl} 
                                alt={prize ? prize.name : alreadyPlayedPrize} 
                                className="prize-image"
                            />
                        )}
                        <p>
                            Vyhrál/a jsi: 
                            <br />
                            <strong>
                                {prize ? prize.name : alreadyPlayedPrize}
                            </strong>
                        </p>
                        <p className="code-display">
                            Použij kód: 
                            <br />
                            <strong 
                                className="coupon-code"
                                onClick={() => copyCode(prize ? prize.code : alreadyPlayedCode)}
                                style={{ cursor: 'pointer' }}
                                title="Klikni pro zkopírování"
                            >
                                {prize ? prize.code : alreadyPlayedCode}
                            </strong>
                            <br />
                            <span style={{ fontSize: '12px', color: '#aaa' }}>
                                👆 Klikni na kód pro zkopírování
                            </span>
                        </p>
                    </div>
                      <p>Platí do dnešní půlnoci!</p>

                 <div className="terms">
  U objednávky nad {prize ? prize.minPurchase : PRIZES.find(p => p.code === alreadyPlayedCode)?.minPurchase || 'X Kč'} zadej kód a já ti do balíčku přihodím tvůj dáreček.

  {((prize && prize.code === 'KRAGUM') || alreadyPlayedCode === 'KRAGUM') && (
    <div style={{ marginTop: '10px' }}>
      Do poznámky můžeš vybrat barvu, která se ti nejvíc líbí, nebo to nechat na náhodný výběr.
    </div>
  )}
</div>

                    
                    <a 
                        href={prize ? prize.productUrl : PRIZES.find(p => p.code === alreadyPlayedCode)?.productUrl || 'https://www.kailushop.cz/'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cta-button"
                    >
                        Vytvořit objednávku s dárečkem
                    </a>
                     <div className="terms">
                        Objednávku ti odešlu v pondělí 8.12. 🙏
                    </div>
                </div>
            )}
        </div>
    );
};

export default Day4;