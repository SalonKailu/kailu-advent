import React, { useState, useEffect, useCallback } from 'react';
import './Day7.css';

const Day7 = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, finished
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [emojis, setEmojis] = useState([]);

    const GAME_DURATION = 15;
    const EMOJI_OPTIONS = ['🧖‍♀️', '✨', '🌸', '💆‍♀️', '🧴', '💅'];

    // Spawn nové emoji
    const spawnEmoji = useCallback(() => {
        const newEmoji = {
            id: Date.now() + Math.random(),
            emoji: EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)],
            left: Math.random() * 80 + 10, // 10-90% zleva
            top: -10,
        };
        setEmojis(prev => [...prev, newEmoji]);
    }, []);

    // Kliknutí na emoji
    const catchEmoji = (id) => {
        setEmojis(prev => prev.filter(e => e.id !== id));
        setScore(prev => prev + 1);
    };

    // Start hry
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setEmojis([]);
    };

    // Timer
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (gameState === 'playing' && timeLeft === 0) {
            setGameState('finished');
            setEmojis([]);
        }
    }, [gameState, timeLeft]);

    // Spawn emoji během hry
    useEffect(() => {
        if (gameState === 'playing') {
            const spawnInterval = setInterval(() => {
                spawnEmoji();
            }, 400); // Nové emoji každých 400ms
            return () => clearInterval(spawnInterval);
        }
    }, [gameState, spawnEmoji]);

    // Pohyb emoji dolů
    useEffect(() => {
        if (gameState === 'playing') {
            const moveInterval = setInterval(() => {
                setEmojis(prev => 
                    prev
                        .map(e => ({ ...e, top: e.top + 3 }))
                        .filter(e => e.top < 100) // Odstranit emoji co spadly dolů
                );
            }, 50);
            return () => clearInterval(moveInterval);
        }
    }, [gameState]);

    // Sdílení výsledku
    const shareResult = () => {
        const text = `Chytila jsem ${score} ✨ za 15 sekund! Kolik ty? 👉 https://www.kailushop.cz/?advent=open`;
        
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile && navigator.share) {
            navigator.share({ text }).catch(() => copyToClipboard(text));
        } else {
            copyToClipboard(text);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Zkopírováno! Teď to můžeš poslat kamarádce 📋');
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Zkopírováno! Teď to můžeš poslat kamarádce 📋');
        });
    };

    // Získání textu podle skóre
    const getResultText = () => {
        if (score <= 5) return "Snaha se cení! 😊";
        if (score <= 15) return "Solidní úlovek!";
        if (score <= 25) return "Jsi královna! 👑";
        return "WOW! Po tomto výkonu máš nárok na celý spa večer! 🎉";
    };

    return (
        <div className="day7-container">
            {gameState === 'start' && (
                <div className="day7-start">
                    <h2>Chytni co nejvíc! ✨</h2>
                    <p>Máš 15 sekund. Klikej na padající emoji a posbírej jich co nejvíc!</p>
                    <button onClick={startGame} className="day7-start-btn">
                        START
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="day7-game">
                    <div className="day7-header">
                        <div className="day7-score">✨ {score}</div>
                        <div className={`day7-timer ${timeLeft <= 5 ? 'warning' : ''}`}>
                            {timeLeft}s
                        </div>
                    </div>
                    
                    <div className="day7-arena">
                        {emojis.map(emoji => (
                            <div
                                key={emoji.id}
                                className="day7-emoji"
                                style={{
                                    left: `${emoji.left}%`,
                                    top: `${emoji.top}%`,
                                }}
                                onClick={() => catchEmoji(emoji.id)}
                            >
                                {emoji.emoji}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'finished' && (
                <div className="day7-result">
                    <h2>🎉 Výborně!</h2>
                    <div className="day7-final-score">
                        <span className="score-number">{score}</span>
                        <span className="score-label">chycených ✨</span>
                    </div>
                    
                    <p className="day7-result-text">{getResultText()}</p>
                    
                    <div className="day7-tip">
                        <p>💡 A víš co? Alespoň <strong>tolik minut bys dneska měla strávit s maskou na obličeji a chillovat!</strong>👑</p>
                        <p>A pro případ, že by ti docházely zásoby na svátky, mrkni tu 👇</p>
                        <a 
                            href="https://www.kailushop.cz/masky/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="day7-shop-btn"
                        >
                            Prohlédnout naše masky
                        </a>
                    </div>

                    <div className="day7-actions">
                        <button onClick={shareResult} className="day7-share-btn">
                            Sdílet výsledek 📋
                        </button>
                        <button onClick={startGame} className="day7-replay-btn">
                            Hrát znovu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Day7;