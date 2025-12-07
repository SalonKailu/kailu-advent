import React, { useState, useRef, useEffect } from 'react';
import './DayBox.css'; 
// Důležité: Používáme Day23 a pouze textovou zprávu o návratu zítra

const Day23 = () => {
    // --- STATE HOOKS ---
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true); 

    // 💡 NOVÁ REFERENCE PRO ULOŽENÍ ID ČASOVAČE (kvůli clearTimeout)
    const timeoutRef = useRef(null);
    
    // --- AUDIO REFS ---
    const correctRef = useRef(null);
    const wrongRef = useRef(null);

    // --- NAČTENÍ AUDIO SOUBORŮ ---
    useEffect(() => {
        // Předpokládáme, že soubory jsou dostupné v public/sounds/
        correctRef.current = new Audio('/sounds/correct.mp3');
        wrongRef.current = new Audio('/sounds/wrong.mp3');
        
        if (correctRef.current) correctRef.current.volume = 0.5;
        if (wrongRef.current) wrongRef.current.volume = 0.5;
    }, []);

    // --- KVIZOVÉ OTÁZKY (5 celkem - VÁNOČNÍ) ---
    const questions = [
        {
            question: 'V Norsku lidé na Štědrý den schovávají jednu věc před čarodějnicemi a zlými duchy. Co to je?',
            options: [
                { id: 'a', text: 'Veškeré stříbrné příbory', correct: false },
                { id: 'b', text: 'Košťata a mopy', correct: true },
                { id: 'c', text: 'Vánoční cukroví', correct: false }
            ],
            correctFeedback: 'Správně! Čarodějnice a zlí duchové na nich prý létají, proto musí být pečlivě schované. Norové nic neriskují!',
            wrongFeedback: 'Špatně, i když, možná není na škodu schovat to všechno! 😁 Schovávají se ale hlavně košťata a mopy! Podle legendy na nich čarodějnice létají.'
        },
        {
            question: 'V jaké zemi je zvykem, že si lidé na Štědrý den dávají pod talíř symbol pro štěstí a hojnost, který nosí v peněžence?',
            options: [
                { id: 'a', text: 'Itálie (olivovou ratolest)', correct: false },
                { id: 'b', text: 'Dánsko (rýžovou mandli)', correct: false },
                { id: 'c', text: 'Česko (kapří šupinu)', correct: true }
            ],
            correctFeedback: 'Přesně tak, kapří šupina se nosí v peněžence po celý rok pro štěstí a spoustu peněz.',
            wrongFeedback: 'Je to naše kapří šupina!🐟 Ta se dává pod talíř a poté se nosí v peněžence pro hojnost.'
        },
        {
            question: 'Která populární vánoční rostlina symbolizuje zdraví a štěstí a pod kterou se lidé rádi líbají?',
            options: [
                { id: 'a', text: 'Vánoční hvězda (Poinsettia)', correct: false },
                { id: 'b', text: 'Jmelí (Viscum album)', correct: true },
                { id: 'c', text: 'Cesmína (Holly)', correct: false }
            ],
            correctFeedback: 'Super! Jmelí byste si neměla kupovat sama, ale dostat ho darem, aby přineslo štěstí. Polibek pod ním zaručuje lásku až do příštích Vánoc.',
            wrongFeedback: 'Správně je jmelí! Polibek pod ním má zajistit lásku a štěstí na celý příští rok.'
        },
        {
            question: 'Který americký řetězec rychlého občerstvení je v Japonsku tak populární, že si tam lidé dělají rezervace na vánoční večeři?',
            options: [
                { id: 'a', text: 'McDonald\'s', correct: false },
                { id: 'b', text: 'Pizza Hut', correct: false },
                { id: 'c', text: 'KFC', correct: true }
            ],
            correctFeedback: 'Správně! Je to slavná tradice "Kentucky for Christmas" – vznikla z chytré marketingové kampaně a pevně zakořenila.',
            wrongFeedback: 'Je to KFC! V Japonsku je to obrovská vánoční tradice, na kterou se stojí fronty.'
        },
        {
            question: 'Co byste měla podle staré české vánoční pověry udělat, abyste zjistila, jestli se v příštím roce vdáte / podíváte za hranice domova?',
            options: [
                { id: 'a', text: 'Házet střevícem přes rameno', correct: true },
                { id: 'b', text: 'Krájet jablko napříč', correct: false },
                { id: 'c', text: 'Třást s plotem', correct: false }
            ],
            correctFeedback: 'Výborně! Pokud hrot střevíce ukazuje ke dveřím, do roka se vdáte nebo se vydáte do světa. Hodně štěstí!',
            wrongFeedback: 'Je to hod střevícem! Pokud spadne špičkou ke dveřím, můžete se těšit na cestování nebo svatbu.'
        }
    ];

    // --- NOVÁ FUNKCE: PŘESKOČENÍ NA DALŠÍ OTÁZKU/VÝSLEDEK ---
    const handleNext = () => {
        // 🛑 ZRUŠÍME AUTOMATICKÝ ČASOVAČ, ABY SE NESPUSTIL DVOJITÝ PŘESUN
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Ruční přesun na další otázku/výsledek
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            setShowResult(true);
        }
    };

    // --- HANDLERY: ÚPRAVA handleAnswer pro automatický timeout ---
    const handleAnswer = (option) => {
        setSelectedAnswer(option.id);
        const isCorrect = option.correct;
        
        // 🔊 Přehrávání zvuku
        if (soundEnabled) {
            if (isCorrect) {
                if (correctRef.current) correctRef.current.play();
            } else {
                if (wrongRef.current) wrongRef.current.play();
            }
        }

        if (isCorrect) {
            setScore(score + 1);
        }
        setShowFeedback(true);

        // ⏱️ NASTAVÍME AUTOMATICKÝ ČASOVAČ A ULOŽÍME JEHO ID
        const id = setTimeout(() => {
            // ZDE ZRUŠÍME REFERENCI, ABYCHOM VĚDĚLI, ŽE ČASOVAČ PROBĚHL
            timeoutRef.current = null; 

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                setShowResult(true);
            }
        }, 8500); // 8.5 vteřiny

        timeoutRef.current = id;
    };

    // --- FUNKCE PRO VÝSLEDEK (Beze změny) ---
    const getResultMessage = () => {
        const maxScore = questions.length;
        let emoji = '🎄';
        let title = 'Nevadí, hlavně že voní cukroví!';
        let text = 'Dnes to nevyšlo, ale hlavně že víš, že je nejdůležitější rodinná pohoda a klid! To je vánoční bonus.';

        if (score === maxScore) {
            emoji = '🏆';
            title = 'Vánoční guru!';
            text = 'Všech 5 správně! Tvoje znalost tradic je ohromující.';
        } else if (score >= maxScore - 1) { // 4 body
            emoji = '⭐';
            title = 'Vánoční hvězda!';
            text = `${score} z 5 – to je super! Tvé znalosti jsou na špičkové úrovni.`;
        } else if (score >= maxScore - 2) { // 3 body
            emoji = '✨';
            title = 'Téměř perfektní!';
            text = `${score} z 5 – gratuluji! Pár zajímavostí ses dozvěděla, zbytek už znáš.`;
        } else if (score >= maxScore - 4) { // 1 nebo 2 body
            emoji = '💫';
            title = 'Dobrý začátek!';
            text = `${score} z 5 – nevadí! Teď už víš víc než předtím a to se počítá.`;
        } 

        return { emoji, title, text };
    };
    
    // --- RENDER ZÁKLADNÍCH PROMĚNNÝCH ---
    const result = showResult ? getResultMessage() : null;
    const currentQ = questions[currentQuestion];

    // --- JSX RENDER ---
    return (
        <>
            <div className="box-header" style={{ background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)' }}>
                <span className="box-badge">🎄 Tentokrát nekosmetický</span>
                <h1 className="box-title">Vánoční kvíz</h1>
                
                {/* Přepínač zvuku pro UX */}
                <button 
                    onClick={() => setSoundEnabled(prev => !prev)} 
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem', zIndex: 10 }}
                >
                    {soundEnabled ? '🔊' : '🔇'}
                </button>
            </div>

            <div className="box-content">
                {!showResult ? (
                    // Kvízové okno
                    <>
                        <div className="box-description">
                            <p style={{ textAlign: 'center', marginBottom: '10px', color: '#888', fontSize: '0.9rem' }}>
                                Otázka {currentQuestion + 1} / {questions.length}
                            </p>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem', color: '#333', lineHeight: '1.6' }}>
                                {currentQ.question}
                            </p>
                        </div>

                        <div className="box-options">
                            {currentQ.options.map((option) => (
                                <button
                                    key={option.id}
                                    className={`box-option ${
                                        selectedAnswer === option.id
                                            ? option.correct
                                                ? 'correct'
                                                : 'wrong'
                                            : selectedAnswer
                                                ? 'disabled'
                                                : ''
                                    }`}
                                    onClick={() => !selectedAnswer && handleAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>

                        {showFeedback && (
                            <>
                                <div 
                                    className={`box-result ${currentQ.options.find(o => o.id === selectedAnswer)?.correct ? 'win' : 'lose'}`}
                                    style={{ marginTop: '20px' }}
                                >
                                    <p style={{ margin: 0 }}>
                                        {currentQ.options.find(o => o.id === selectedAnswer)?.correct 
                                            ? currentQ.correctFeedback 
                                            : currentQ.wrongFeedback}
                                    </p>
                                </div>
                                {/* 💡 TLAČÍTKO "DALŠÍ" */}
                                <button
                                    onClick={handleNext}
                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 25px',
                                        backgroundColor: '#c41e3a',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    {currentQuestion < questions.length - 1 ? 'Další otázka »' : 'Zobrazit výsledek »'}
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    // VÝSLEDKOVÉ OKNO
                    <div className="box-result win" style={{ background: 'linear-gradient(135deg, #fff9f9, #fff)' }}>
                        <div className="box-result-emoji">{result.emoji}</div>
                        <h2 className="box-result-title">{result.title}</h2>
                        <p className="box-result-text">{result.text}</p>
                        
                        {/* --- SPECIÁLNÍ ZPRÁVA S ODKAZEM NA ZÍTRA --- */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                            color: '#333',
                            padding: '30px',
                            borderRadius: '15px',
                            marginTop: '30px',
                            textAlign: 'center',
                            border: '3px solid #c41e3a',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                            <p style={{ fontSize: '1.8rem', marginBottom: '15px' }}>🎁 SKVĚLÁ ZPRÁVA! 🎁</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                                Ať už se vám kvíz povedl jakkoli, máme pro vás DÁREK!
                            </p>
                            <p style={{ fontSize: '1.05rem', opacity: '0.9' }}>
                                Bude připraven ZÍTRA (24. 12.) v posledním políčku kalendáře!
                            </p>
                            
                            
                        </div>
                        
                        
                        
                    </div>
                )}
            </div>
        </>
    );
};

export default Day23;