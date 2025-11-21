import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Day3.css';
import { saveEmailToNewsletter } from '../apiService';

const Day3 = () => {
    // Otázky a odpovědi
    const questions = [
        {
            question: "Co je základ úspěšné péče o pleť?",
            options: [
                "Znát své znamení zvěrokruhu",
                "Znát svůj typ a stav pleti",
                "Umět nazpaměť všechny INCI složky",
                "Kopírovat rutinu kamarádky"
            ],
            correct: 1
        },
        {
            question: "Co NENÍ chyba u citlivé pleti?",
            options: [
                "Používat silně parfémované produkty",
                "Střídat více aktivních látek včetně retinolu a kyselin",
                "Používat zklidňující produkty, které posilují kožní bariéru",
                "Třikrát týdně peeling"
            ],
            correct: 2
        },
        {
            question: "Který typ pleti potřebuje doplnit vodu i lipidy?",
            options: [
                "Suchá pleť",
                "Smíšená pleť",
                "Mastná pleť",
                "Citlivá pleť"
            ],
            correct: 0
        },
        {
            question: "Co dostanete v každé naší sadě kromě produktů?",
            options: [
                "Jen fakturu",
                "Obecný leták",
                "Personalizovaného průvodce péčí a možnost výměny zdarma",
                "Náhodný vzorek"
            ],
            correct: 2
        },
        {
            question: "Kdy se nedoporučuje používat retinol?",
            options: [
                "Když máte rýmu",
                "Během těhotenství a kojení",
                "Když chcete mít méně vrásek",
                "V liché týdny"
            ],
            correct: 1
        }
    ];

// Slevové kódy
const discountCodes = useMemo(() => ({
    7: 'K7FGH',
    14: 'M14XY',
    21: 'R21QP',
    28: 'T28BN',
    35: 'V35ZK'
}), []); // Prázdné pole závislostí = nikdy se nemění

    // Názvy výsledků
    const resultTitles = {
        0: 'Jaj, dneska to nevyšlo!',
        7: 'Skincare začátečník 🌱',
        14: 'Skincare nadšenec 🌿',
        21: 'Skincare znalec 🌳',
        28: 'Skincare expert 🌲',
        35: 'Skincare guru 👑'
    };

    // State
    const [gameState, setGameState] = useState('start'); // start, playing, finished
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [timer, setTimer] = useState(45);
    const [email, setEmail] = useState('');
    const [gdprConsent, setGdprConsent] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [finalCode, setFinalCode] = useState('');
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Refs pro audio
    const timerMusicRef = useRef(null);
    const correctRef = useRef(null);
    const wrongRef = useRef(null);
    const gameOverRef = useRef(null);

    // --- FUNKCE VYUŽÍVAJÍCÍ STATE (VČETNĚ useCALLBACK PRO HOOK ZÁVISLOSTI) ---
    
    // Konec hry - musíme ji definovat PŘED handleTimeOut a handleAnswer
    const endGame = useCallback((finalDiscount) => {
        setGameState('finished');
        setDiscount(finalDiscount);
        setShowResult(true);
        
        if (soundEnabled && gameOverRef.current) {
          gameOverRef.current.play();
        }
        
        // Získat kód
        const code = finalDiscount > 0 ? discountCodes[finalDiscount] : '';
        setFinalCode(code);
        
        // Uložit do localStorage
        const gameData = {
          email: email,
          discount: finalDiscount,
          code: code,
          date: new Date().toDateString(),
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('kailuDay3Played', JSON.stringify(gameData));
        
        // Uložit do seznamu všech her
        const allGames = JSON.parse(localStorage.getItem('kailuDay3Games') || '[]');
        allGames.push(gameData);
        localStorage.setItem('kailuDay3Games', JSON.stringify(allGames));
    }, [email, soundEnabled, gameOverRef, discountCodes]);

    // Čas vypršel - musíme ji definovat PŘED useEffectem pro Timer
    const handleTimeOut = useCallback(() => {
        if (soundEnabled && wrongRef.current) {
          wrongRef.current.play();
        }
        // Zde používáme 'discount', proto je v závislostech
        endGame(discount); 
    }, [soundEnabled, wrongRef, endGame, discount]); 

    // Vzít slevu kdykoliv
    const takeDiscount = () => {
        if (discount > 0) {
          endGame(discount);
        }
    };
    
    // Zpracování odpovědi - nemusí být v useCallback, ale volá endGame
    const handleAnswer = (index) => {
        if (index === questions[currentQuestion].correct) {
            const newDiscount = discount + 7;
            setDiscount(newDiscount);
            
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setTimer(45);
                setSelectedAnswer(null);
                
                if (soundEnabled && timerMusicRef.current) {
                    timerMusicRef.current.play();
                }
            } else {
                endGame(newDiscount);
            }
        } else {
            endGame(discount);
        }
    };
    
    // Kontrola, zda už hráč hrál
    const hasPlayedToday = () => {
        const played = localStorage.getItem('kailuDay3Played');
        if (played) {
            const playedData = JSON.parse(played);
            const today = new Date().toDateString();
            // Používá 'email' ze state
            return playedData.date === today && playedData.email === email; 
        }
        return false;
    };
// Start hry
    const startGame = () => {
    if (!email || !gdprConsent) {
        alert('Vyplňte prosím email a potvrďte souhlas s podmínkami.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Zadejte prosím platný email.');
        return;
    }

    if (hasPlayedToday()) {
        alert('Dnešní hru už máte hotovou! Vraťte se zítra pro novou výzvu.');
        return;
    }

    // NOVÉ: VOLÁNÍ CENTRÁLNÍ FUNKCE PRO UKLÁDÁNÍ E-MAILU
    saveEmailToNewsletter(email, gdprConsent, 'Kailu_Advent_Kviz_Den_3'); 
    
    // POKRAČOVÁNÍ HRY
    setGameState('playing');
    setTimer(45);
    
    // 🔊 SPRÁVNE MIESTO PRE SPUSTENIE HUDBY NA POZADÍ (Po kliknutí)
    if (soundEnabled && timerMusicRef.current) {
        timerMusicRef.current.loop = true;
        timerMusicRef.current.play().catch(e => console.log('Music play failed:', e));
    }
};

    // Výběr odpovědi
    const selectAnswer = (index) => {
        if (selectedAnswer !== null) return; 
        
        setSelectedAnswer(index);
        
        if (timerMusicRef.current) {
            timerMusicRef.current.pause();
        }
        
        if (soundEnabled) {
            if (index === questions[currentQuestion].correct) {
                if (correctRef.current) correctRef.current.play();
            } else {
                if (wrongRef.current) wrongRef.current.play();
            }
        }
        
        setTimeout(() => {
            handleAnswer(index);
        }, 1500);
    };

    // --- KONEC FUNKCÍ ---


    // Inicializace audio
    useEffect(() => {
        timerMusicRef.current = new Audio('/sounds/timer-music.mp3');
        correctRef.current = new Audio('/sounds/correct.mp3');
        wrongRef.current = new Audio('/sounds/wrong.mp3');
        gameOverRef.current = new Audio('/sounds/game-over.mp3');
        
        // Nastavení hlasitosti
        if (timerMusicRef.current) timerMusicRef.current.volume = 0.3;
        
        return () => {
            // Cleanup
            if (timerMusicRef.current) timerMusicRef.current.pause();
        };
    }, []);

    // Timer logic
    useEffect(() => {
        // Tento useEffect nyní volá handleTimeOut, která je definována PŘED ním, a je obalena v useCallback.
        if (gameState === 'playing' && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        handleTimeOut(); 
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [gameState, timer, handleTimeOut]); // OPRAVENÉ ZÁVISLOSTI: Linter je spokojen.

 
    return (
        <div className="day3-container">
            {gameState === 'start' && (
                <div className="day3-start">
                    <div className="day3-intro">
                        <h2>Jsi skincare expert?</h2>
                        <p>Dokaž to a vyhraj až <strong>35% slevu!</strong></p>
                        
                        <div className="day3-rules">
                            <h3>Pravidla hry:</h3>
                            <ul>
                                <li>5 otázek o péči o pleť</li>
                                <li>45 sekund na každou odpověď</li>
                                <li>Každá správná = +7% sleva</li>
                                <li>Špatná odpověď nebo čas vypršel = konec</li>
                                <li>Maximální sleva: 35%</li>
                            </ul>
                        </div>
                    </div>
                    
                    <form className="day3-form" onSubmit={(e) => { e.preventDefault(); startGame(); }}>
                        <input
                            type="email"
                            placeholder="Váš email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="day3-input"
                        />
                        
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
                        
                        <label className="day3-checkbox-label">
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(e) => setSoundEnabled(e.target.checked)}
                            />
                            <span>🔊 Zapnout zvuky (doporučujeme!)</span>
                        </label>
                        
                        <button type="submit" className="day3-submit">
                            ZAČÍT HRU
                        </button>
                    </form>
                </div>
            )}
            
            {gameState === 'playing' && (
                <div className="day3-game">
                    <div className="day3-header">
                        <div className="day3-timer-container">
                            <div className={`day3-timer ${timer <= 10 ? 'warning' : ''}`}>
                                <span className="timer-number">{timer}</span>
                                <span className="timer-label">sekund</span>
                            </div>
                            <div className="day3-timer-bar">
                                <div 
                                    className="day3-timer-fill" 
                                    style={{ width: `${(timer / 45) * 100}%` }}
                                />
                            </div>
                        </div>
                        
                        <div className="day3-progress">
                            <span>Otázka {currentQuestion + 1} / {questions.length}</span>
                            <span className="day3-discount-info">Aktuální sleva: {discount}%</span>
                        </div>
                    </div>
                    
                    <div className="day3-question-container">
                        <h2 className="day3-question">{questions[currentQuestion].question}</h2>
                        
                        <div className="day3-options">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`day3-option ${
                                        selectedAnswer !== null
                                            ? index === questions[currentQuestion].correct
                                                ? 'correct'
                                                : selectedAnswer === index
                                                    ? 'wrong'
                                                    : 'disabled'
                                            : ''
                                    }`}
                                    onClick={() => selectAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span className="option-text">{option}</span>
                                </button>
                            ))}
                        </div>
                        
                        {discount > 0 && selectedAnswer === null && (
                            <button className="day3-take-discount" onClick={takeDiscount}>
                                Vzít {discount}% slevu a ukončit hru
                            </button>
                        )}
                    </div>
                </div>
            )}
            
            {gameState === 'finished' && showResult && (
                <div className="day3-result">
                    <div className="day3-result-content">
                        <h2 className="day3-result-title">{resultTitles[discount]}</h2>
                        
                        {discount > 0 ? (
                            <>
                                <div className="day3-discount-won">
                                    <span className="discount-number">{discount}%</span>
                                    <span className="discount-label">SLEVA</span>
                                </div>
                                
                                <div className="day3-code-container">
                                    <p>Váš slevový kód:</p>
                                    <div className="day3-code">{finalCode}</div>
                                    <p className="day3-code-info">
                                        Kód platí do 3.12.2025 23:59<br />
                                        Minimální nákup: 1000 Kč
                                    </p>
                                </div>
                                
                                <a 
                                    href="https://www.kailushop.cz" 
                                    className="day3-shop-button"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    POUŽÍT SLEVU V E-SHOPU
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="day3-no-discount">
                                    Bohužel jste nezískal/a žádnou slevu.<br />
                                    Ale nevadí, adventní kalendář vás obdarovává až do Štědrého dne! 💪
                                </p>
                                <p className="day3-tomorrow">
                                    Budeme se těšit zítra!👋
                                </p>
                            </>
                        )}
                        
                        <div className="day3-social">
                            <p>Pochlubte se výsledkem:</p>
                            <button 
                                className="day3-share"
                                onClick={() => {
                                    // URL, která se bude sdílet (adresa vašeho e-shopu)
                                    const shareUrl = encodeURIComponent('https://www.kailushop.cz/');
                                    
                                    // Text zprávy
                                    const baseText = discount > 0 
                                        ? "Získala jsem " + discount + "% slevu na kosmetiku díky Kailu kvízu! Zkus to taky: "
                                        : "Zkusila jsem štěstí adventním kvízu! 💪 Zkus to taky: ";
                                    
                                    // URL pro Messenger sdílení (Fallback)
                                    const messengerLink = "https://www.facebook.com/dialog/send?link=" + shareUrl + "&app_id=233519842426";
                                    
                                    // 1. Zkusíme použít nativní Web Share API (funguje nejlépe na mobilu pro DM)
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'Kailu Adventní Kalendář',
                                            text: baseText + 'https://www.kailushop.cz/',
                                            url: 'https://www.kailushop.cz/',
                                        })
                                        .catch((error) => console.log('Error sharing', error));
                                    } else {
                                        // 2. Fallback pro desktop nebo starší prohlížeče (otevře Messenger dialog)
                                        window.open(messengerLink, '_blank');
                                    }
                                }}
                            >
                                Sdílet přes Messenger
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Day3;