import React, { useState, useEffect } from 'react';
import './Day4.css';
// ✅ POUŽIJEME SPRÁVNÝ API IMPORT (JAKO DEN 3)
import { saveEmailToNewsletter } from '../apiService'; 

// --- KONSTANTA PRO ULOŽENÍ STAVU HRY ---
const LOCAL_STORAGE_KEY = 'kailuDay4Played';


// --- POMOCNÉ FUNKCE PRO HŘE (JSOU LOKÁLNÍ A ODPOVÍDAJÍ STRUKTUŘE DNE 3) ---

// Zjistí, zda se dnes již hrálo
const checkPlayedToday = () => {
    const played = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (played) {
        const playedData = JSON.parse(played);
        const today = new Date().toDateString();
        // Stačí kontrola data, box je jednorázová akce na zařízení
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
const setPlayedDay = (email, code) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        date: new Date().toDateString(),
        email: email, 
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
    const [email, setEmail] = useState('');
    const [gdprConsent, setGdprConsent] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (checkPlayedToday()) {// Používáme lokální checkPlayedToday
            const storedCode = getPlayedCode(); // Používáme lokální getPlayedCode
            if (storedCode) {
                const foundPrize = PRIZES.find(p => p.code === storedCode);
                setAlreadyPlayedPrize(foundPrize ? foundPrize.name : 'Tvůj dárek');
                setAlreadyPlayedCode(storedCode);
            }
            setShowForm(false);
            setShowResult(true);
        }
    }, []);


    // --- LOGIKA KLIKNUTÍ NA KRABIČKU ---
    const handleBoxClick = (e) => {
        e.preventDefault();

        // 1. Kontrola formuláře a omezení
        if (checkPlayedToday()) {
            alert('Dnes už jsi si krabičku vybral/a. Vrať se zítra pro novou výzvu!');
            return;
        }

        if (!email || !gdprConsent) {
            alert('Pro odhalení překvapení je nutné vyplnit email a souhlasit s GDPR.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Zadejte prosím platný email.');
            return;
        }

        // 2. Náhodný výběr výhry
        const selectedPrize = getRandomPrize(PRIZES);
        
        // 3. Uložení dat a označení jako odehrané
        // Ukládáme přes správné API a lokálně
        saveEmailToNewsletter(email, gdprConsent, 'Kailu_Advent_Krabička_Den_4', selectedPrize.name);
        setPlayedDay(email, selectedPrize.code); // Uloží stav a kód
        
        // 4. Zobrazení výsledku
        setPrize(selectedPrize);
        setShowForm(false);
        setShowResult(true);
    };


    // --- VYKRESLENÍ (Beze změny, použije opravené proměnné) ---
    // ... (zde by byl return blok z předchozí odpovědi)

    return (
        <div className="day-container day-4">
            <h2>🎁 Vyber si svůj dárek!</h2>
            <p className="day-description">
                Do Vánoc zbývá ještě 20 dní, ale my ti prostě chceme udělat radost. ❤
            </p>

            {/* --- ZOBRAZENÍ FORMULÁŘE PŘED HRANÍM --- */}
            {showForm && (
                <form onSubmit={handleBoxClick} className="kailu-form">
                    <input
                        type="email"
                        placeholder="Zadejte váš email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="email-input"
                    />
                    
                    {/* ✅ SJEDNOCENÝ BLOK SOUHLASU */}
                    <label className="day3-checkbox-label">
                        <input
                            type="checkbox"
                            checked={gdprConsent}
                            onChange={(e) => setGdprConsent(e.target.checked)}
                            required
                        />
                        <span>
                            Souhlasím s{' '}
                            <a href="https://www.kailushop.cz/podminky-advent" target="_blank" rel="noopener noreferrer">
                                podmínkami adventu
                            </a>
                            {' '}a{' '}
                            <a href="https://www.kailushop.cz/podminky-ochrany-osobnich-udaju/" target="_blank" rel="noopener noreferrer">
                                ochranou osobních údajů
                            </a>
                        </span>
                    </label>

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
                </form>
            )}

            {/* --- ZOBRAZENÍ VÝSLEDKU --- */}
            {showResult && (
                <div className="result-panel">
                    <h3>{checkPlayedToday() ? 'Osud ti vybral' : '🎉 Gratulujeme!'}</h3>
                    
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
                            <strong className="coupon-code">
                                {prize ? prize.code : alreadyPlayedCode}
                            </strong>
                        </p>
                    </div>

                    <div className="terms">
                        Tento dárek ti automaticky přidáme (po zadání kódu v košíku)
                        k objednávce nad {prize ? prize.minPurchase : PRIZES.find(p => p.code === alreadyPlayedCode)?.minPurchase || 'X Kč'}.
                        Platí do dnešní půlnoci!🌙
                    </div>
                    
                    <a 
                        href={prize ? prize.productUrl : PRIZES.find(p => p.code === alreadyPlayedCode)?.productUrl || 'VAŠE_URL_ESHOPU'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cta-button"
                    >
                        Vytvořit objednávku s dárečkem
                    </a>
                </div>
            )}
        </div>
    );
};

export default Day4;