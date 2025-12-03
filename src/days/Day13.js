import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Day3.css';

const Day13 = () => {
    // Otázky a odpovědi pro Den 13: Kosmetika, zábava a zapeklitosti!
    const questions = [
        {
            question: "Která složka by se měla téměř vždy používat jako poslední krok ranní rutiny, bez ohledu na typ pleti?",
            options: [
                "Kyselina hyaluronová",
                "Pleťový olej",
                "SPF - ochrana proti UV záření",
                "Niacinamid"
            ],
            correct: 2
        },
        {
            question: "Kolik gramů SPF krému (sluneční ochrany) byste měli ideálně aplikovat na obličej, krk a dekolt pro dostatečnou ochranu?",
            options: [
                "Jako hrášek (cca 0,25 g)",
                "Jako lžička (cca 5 g)",
                "Jako malá bobulka hroznového vína (cca 2 g)",
                "Jen tolik, aby se krém rychle vstřebal"
            ],
            correct: 2
        },
        {
            question: "Co je hlavním úkolem ceramidů v péči o pleť?",
            options: [
                "Okamžitě vypnout vrásky",
                "Chránit pleť před UV zářením",
                "Zesvětlovat pigmentové skvrny",
                "Obnovovat a posilovat kožní bariéru"
            ],
            correct: 3
        },
        {
            question: "Kolik času byste měli nechat, aby se aktivní sérum vstřebalo, než nanesete další produkt (např. krém)?",
            options: [
                "5-10 minut (pro maximální absorpci)",
                "Do zaschnutí (cca 30-60 sekund)",
                "Nezáleží na tom, naneste hned",
                "1 hodinu"
            ],
            correct: 1
        },
        {
            question: "Kdy je ideální čas aplikovat na obličej čistící jílovou masku?",
            options: [
                "Ráno před mytím zubů",
                "Ihned po použití aktivních kyselin (aby se účinky navzájem posílily)",
                "Po důkladném double-cleanse",
                "Když je pleť nalíčená"
            ],
            correct: 2
        }
    ];

    // Slevové kódy
    const discountCodes = useMemo(() => ({
        7: 'L7FGH',
        14: 'N14XY',
        21: 'S21QP',
        28: 'U28BN',
        35: 'W35ZK'
    }), []); 

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
    const [gameState, setGameState] = useState('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [timer, setTimer] = useState(45);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [finalCode, setFinalCode] = useState('');
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Refs pro audio
    const timerMusicRef = useRef(null);
    const correctRef = useRef(null);
    const wrongRef = useRef(null);
    const gameOverRef = useRef(null);

    // Konec hry 
    const endGame = useCallback((finalDiscount) => {
        setGameState('finished');
        setDiscount(finalDiscount);
        setShowResult(true);
        
        if (soundEnabled && gameOverRef.current) {
            gameOverRef.current.play();
        }
        
        const code = finalDiscount > 0 ? discountCodes[finalDiscount] : '';
        setFinalCode(code);
        
        const gameData = {
            discount: finalDiscount,
            code: code,
            date: new Date().toDateString(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('kailuDay13Played', JSON.stringify(gameData));
    }, [soundEnabled, discountCodes]);

    // Čas vypršel
    const handleTimeOut = useCallback(() => {
        if (soundEnabled && wrongRef.current) {
            wrongRef.current.play();
        }
        endGame(discount); 
    }, [soundEnabled, endGame, discount]); 

    // Vzít slevu kdykoliv
    const takeDiscount = () => {
        if (discount > 0) {
            endGame(discount);
        }
    };
    
    // Zpracování odpovědi 
    const handleAnswer = (index) => {
        if (index === questions[currentQuestion].correct) {
            const newDiscount = discount + 7;
            setDiscount(newDiscount);
            
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setTimer(45);
                setSelectedAnswer(null);
                
                if (soundEnabled && timerMusicRef.current) {
                    timerMusicRef.current.loop = true;
                    timerMusicRef.current.play().catch(e => console.log('Music play failed:', e));
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
        const played = localStorage.getItem('kailuDay13Played');
        if (played) {
            const playedData = JSON.parse(played);
            const today = new Date().toDateString();
            return playedData.date === today;
        }
        return false;
    };
    
    // Start hry
    const startGame = () => {
        if (hasPlayedToday()) {
            alert('Dnešní hru už máte hotovou! Vraťte se zítra pro novou výzvu.');
            return;
        }

        setGameState('playing');
        setTimer(45);
        
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

    // Sdílení výsledku
    const shareResult = () => {
        let text;
        if (discount === 35) {
            text = `Jsem skincare guru! 👑 Získala jsem ${discount}% slevu v Kailu kvízu. Zkus to taky 👉 https://www.kailushop.cz/?advent=open`;
        } else if (discount > 0) {
            text = `Získala jsem ${discount}% slevu v Kailu skincare kvízu! 💄 Porazíš mě? 👉 https://www.kailushop.cz/?advent=open`;
        } else {
            text = `Kailu skincare kvíz mě dostal 😅 Zvládneš to líp? 👉 https://www.kailushop.cz/?advent=open`;
        }

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
            navigator.share({ text }).catch(() => copyToClipboard(text));
        } else {
            copyToClipboard(text);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Zkopírováno! Teď to můžeš vložit do Messengeru nebo kamkoliv jinam 📋');
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Zkopírováno! Teď to můžeš vložit do Messengeru nebo kamkoliv jinam 📋');
        });
    };

    // Inicializace audio
    useEffect(() => {
        timerMusicRef.current = new Audio('/sounds/timer-music.mp3');
        correctRef.current = new Audio('/sounds/correct.mp3');
        wrongRef.current = new Audio('/sounds/wrong.mp3');
        gameOverRef.current = new Audio('/sounds/game-over.mp3');
        
        if (timerMusicRef.current) timerMusicRef.current.volume = 0.3;
        
        return () => {
            if (timerMusicRef.current) timerMusicRef.current.pause();
        };
    }, []);

    // Timer logic
    useEffect(() => {
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
    }, [gameState, timer, handleTimeOut]);

    return (
        <div className="day3-container"> 
            {gameState === 'start' && (
                <div className="day3-start">
                    <div className="day3-intro">
                        <h2 style={{color: '#faa4a6'}}>Pro velký úspěch ještě jednou!</h2>
                        <h2>Jak se ti bude dařit ve druhém kole?</h2>
                        <p>Zkus to a vyhraj až <strong>35% slevu!</strong></p>
                        
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
                    
                    <div className="day3-form">
                        <label className="day3-checkbox-label">
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(e) => setSoundEnabled(e.target.checked)}
                            />
                            <span>🔊 Zapnout zvuky (doporučujeme!)</span>
                        </label>
                        
                        <button onClick={startGame} className="day3-submit">
                            ZAČÍT HRU
                        </button>
                    </div>
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
                                    <div 
                                        className="day3-code" 
                                        onClick={() => {
                                            navigator.clipboard.writeText(finalCode);
                                            alert('Kód zkopírován! 📋');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        title="Klikni pro zkopírování"
                                    >
                                        {finalCode}
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#aaa', marginTop: '5px' }}>
                                        👆 Klikni na kód pro zkopírování
                                    </p>
                                    <p className="day3-code-info">
                                        Kód platí do 13.12.2025 23:59<br />
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
                                onClick={shareResult}
                            >
                                Sdílet výsledek 📋
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Day13;