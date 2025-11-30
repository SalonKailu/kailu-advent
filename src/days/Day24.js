import React, { useState } from 'react';
import './DayBox.css'; // Využití dodaných CSS stylů

const Day24 = () => {
    const GIFT_CODE = 'JEZISEK';
    const [copied, setCopied] = useState(false);

    /**
     * Zkopíruje kód do schránky a na chvíli změní stav pro vizuální potvrzení.
     */
    const handleCopyCode = () => {
        // Kontrola, zda je clipboard API dostupné
        if (navigator.clipboard) {
            navigator.clipboard.writeText(GIFT_CODE).then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2500); // Zobrazí "Zkopírováno" na 2.5 sekundy
            }).catch(err => {
                console.error('Nepodařilo se zkopírovat kód:', err);
                alert('Nepodařilo se automaticky zkopírovat kód. Prosím zkopírujte: ' + GIFT_CODE);
            });
        } else {
            // Fallback pro starší prohlížeče
            alert('Váš prohlížeč nepodporuje automatické kopírování. Prosím zkopírujte kód ručně: ' + GIFT_CODE);
        }
    };

    return (
        <div className="day3-container"> {/* Používám kontejnerovou třídu z předchozích dní pro layout */}
            
            {/* HLAVIČKA - Používá DayBox styly pro slavnostní vzhled */}
            <div className="box-header">
                <div className="box-badge">Je tu ŠTĚDRÝ DEN 🎄</div>
                <h1 className="box-title">A my pro vás máme slibované překvapení!</h1>
            </div>

            <div className="box-content">
                
                {/* POPIS PRODUKTU/DÁRKU - Využívá box-description třídy */}
                <div className="box-description">
                    <p>
                        Je to doslova <strong>DÁREK</strong>! 🎁
                    </p>
                    <p>
                        Stačí si vybrat cokoliv z našeho e-shopu (bez minimální útraty!) a v košíku zadat tajný kód. My už se postaráme, aby ve vašem balíčku přistálo překvapení.
                    </p>
                    <p>
                        Platí až do konce ledna 2026. Pak už si i Ježíšek bude chtít odpočinout. 😇
                    </p>
                </div>

                {/* KÓD - Využívá box-code-container třídy pro kopírování */}
                <div className="box-question">
                    <p className="box-question-text">
                        Kód pro získání dárku:
                    </p>
                </div>

                <div 
                    className="box-code-container" 
                    onClick={handleCopyCode}
                    title="Kliknutím zkopírujete kód"
                >
                    <div className="box-code-label">Váš vánoční kód</div>
                    <div className="box-code">
                        {copied ? <span className="box-code-copied">ZKOPÍROVÁNO!</span> : GIFT_CODE}
                    </div>
                    <div className="box-code-hint">
                        Klikněte pro zkopírování (nebo si kód někam uložte)
                    </div>
                </div>

                {/* CTA - Využívá box-cta třídy */}
                <a 
                    href="https://www.kailushop.cz" 
                    className="box-cta"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    PŘEJÍT DO E-SHOPU
                </a>
                
                {/* NOVÁ SEKCE: POZVÁNKA NA SKICARE VÝZVU */}
                <div 
                    className="box-challenge-promo" 
                    style={{ 
                        marginTop: '40px', 
                        padding: '25px', 
                        border: '2px solid #f1eae2', 
                        borderRadius: '15px', 
                        backgroundColor: '#fffafa',
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{ 
                        color: '#faa4a6', 
                        fontFamily: 'Cinzel, serif', 
                        fontSize: '1.4rem', 
                        marginBottom: '15px' 
                    }}>
                        Užijte si svátky a načerpejte síly!
                    </h3>
                    <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                        V lednu nás čeká měsíc plný tipů, rad a péče o pleť ve <strong>Skincare výzvě!</strong>
                    </p>
                    <a 
                        href="https://www.kailushop.cz/lednovavyzva" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                            display: 'inline-block', 
                            padding: '12px 25px', 
                            backgroundColor: '#faa4a6', // Používáme barvu z hlavičky pro kontrast
                            color: 'white', 
                            borderRadius: '8px', 
                            textDecoration: 'none', 
                            fontWeight: '700',
                            letterSpacing: '0.5px'
                        }}
                    >
                        PŘIDAT SE DO VÝZVY
                    </a>
                </div>


                <div className="box-footer">
                    <p>Veselé Vánoce přeje tým Kailu!</p>
                </div>
            </div>
        </div>
    );
};

export default Day24;