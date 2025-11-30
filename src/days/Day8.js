import React, { useState } from 'react';
import './DayVideo.css';

const Day8 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  const questions = [
    {
      question: 'Ruku na srdce – jak často usínáš s make-upem?',
      options: [
        { text: 'Nikdy, jsem vzorná', isGood: true },
        { text: 'Občas... no dobře, často', isGood: false }
      ],
      goodResponse: 'Respekt! Tvoje pleť ti děkuje.',
      badResponse: 'Noční můra pro póry. Ale neboj, máme řešení!'
    },
    {
      question: 'Co děláš ráno po večírku jako první?',
      options: [
        { text: 'Hydratace a péče o pleť', isGood: true },
        { text: 'Kafe. Hodně kafe.', isGood: false }
      ],
      goodResponse: 'Správně! Pleť po probdělé noci potřebuje extra lásku.',
      badResponse: 'Kafe je fajn, ale zkus přidat i něco pro pleť. Uvidíš rozdíl!'
    }
  ];

  const handleAnswer = (optionIndex) => {
    const isGood = questions[currentQuestion].options[optionIndex].isGood;
    const newAnswers = [...answers, { questionIndex: currentQuestion, isGood }];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowVideo(true);
      }
    }, 2000);
  };

  const currentQ = questions[currentQuestion];
  const lastAnswer = answers[answers.length - 1];
  const showResult = lastAnswer && lastAnswer.questionIndex === currentQuestion;

  if (!showVideo) {
    return (
      <>
        <div className="video-header">
          <span className="video-badge">✨ Mini kvíz</span>
          <h1 className="video-title">Pleť vs. Vánoční večírky</h1>
        </div>

        <div className="quiz-intro">
          <p className="quiz-intro-text">
            Dvě rychlé otázky a pak ti ukážu, jak přežít svátky bez újmy na pleti.
          </p>

          <div className="quiz-question">
            <p className="quiz-question-text">{currentQ.question}</p>
            
            <div className="quiz-options">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    showResult && answers[currentQuestion]?.isGood === option.isGood 
                      ? (option.isGood ? 'correct' : 'wrong') 
                      : ''
                  }`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`quiz-result ${lastAnswer.isGood ? 'correct' : 'wrong'}`}>
                {lastAnswer.isGood ? currentQ.goodResponse : currentQ.badResponse}
              </div>
            )}
          </div>

          <div className="video-footer">
            <p>Otázka {currentQuestion + 1} / {questions.length}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="video-header">
        <span className="video-badge">🎬 Video</span>
        <h1 className="video-title">Přežij večírky bez vrásek</h1>
      </div>

      <div className="video-wrapper">
        <video 
          controls 
          playsInline
          poster=""
        >
          <source 
            src="https://www.kailushop.cz/user/documents/upload/advent/plet-party.mp4" 
            type="video/mp4" 
          />
          Tvůj prohlížeč nepodporuje video.
        </video>
      </div>

      <div className="video-content">
        <div className="checklist">
          <div className="checklist-title">
            📋 Tvůj party-proof checklist
          </div>
          <div className="checklist-items">
            <div className="checklist-item">
              <span className="checklist-icon">✓</span>
              <span>Odlič se VŽDY. I když je 3 ráno. I když "to nestojí za to".</span>
            </div>
            <div className="checklist-item">
              <span className="checklist-icon">✓</span>
              <span>Double cleansing – olejem a pak gelem. Jeden krok nestačí.</span>
            </div>
            <div className="checklist-item">
              <span className="checklist-icon">✓</span>
              <span>Ráno hydratační maska. Zachrání unavený obličej.</span>
            </div>
            <div className="checklist-item">
              <span className="checklist-icon">✓</span>
              <span>Ledové lžičky na oči. Stará škola, ale funguje.</span>
            </div>
            <div className="checklist-item">
              <span className="checklist-icon">✓</span>
              <span>Pij vodu mezi drinky. Tvoje pleť (a hlava) ti poděkuje.</span>
            </div>
          </div>
        </div>

        <a 
          href="https://www.kailushop.cz/produkty/"
          className="video-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nakoupit péči na party sezónu →
        </a>

        <div className="video-footer">
          <p>Užij si svátky bez výčitek – pleť to zvládne!</p>
        </div>
      </div>
    </>
  );
};

export default Day8;