import React, { useState } from 'react';
import './App.css';
import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day4';
import Day5 from './days/Day5';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
 const [openedDays, setOpenedDays] = useState(() => {
  const saved = localStorage.getItem('kailuAdventOpened');
  return saved ? new Set(JSON.parse(saved)) : new Set();
});
  
 // Automatické datum
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = 12; // DOČASNĚ PRO TEST
  
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  
const handleDayClick = (day) => {
 if (day <= currentDay && currentMonth === 12) {
    setSelectedDay(day);
    const newOpenedDays = new Set([...openedDays, day]);
    setOpenedDays(newOpenedDays);
    localStorage.setItem('kailuAdventOpened', JSON.stringify([...newOpenedDays]));
  }
};
  const closeModal = () => {
    setSelectedDay(null);
  };
  
  const getDayStatus = (day) => {
    if (openedDays.has(day)) return 'opened';
    if (day <= currentDay && currentMonth === 12) return 'available';
    return 'locked';
  };
  
  return (
    <div className="App">
      <div className="header">
        <h1>Náš adventní kalendář</h1>
        <p>24 dní plných překvapení, her a dárků! 🎄</p>
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const status = getDayStatus(day);
          
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={status === 'locked'}
              className={`day-box ${status}`}
            >
              <span className="day-number">{day}</span>
              {status === 'available' && <span className="day-label">OTEVŘI!</span>}
              {status === 'opened' && <span className="day-label">✓</span>}
              {status === 'locked' && <span className="day-icon">🔒</span>}
            </button>
          );
        })}
      </div>

{selectedDay && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {(() => {
       const dayComponents = {
  1: <Day1 onClose={closeModal} />,
  2: <Day2 />,
  3: <Day3 />,
  4: <Day4 />,
  5: null,  // Zatím není hotový
  6: null,  // Zatím není hotový
  7: null,  // Zatím není hotový
  8: null,  // Zatím není hotový
  9: null,  // Zatím není hotový
  10: null, // Zatím není hotový
  11: null, // Zatím není hotový
  12: null, // Zatím není hotový
  13: null, // Zatím není hotový
  14: null, // Zatím není hotový
  15: null, // Zatím není hotový
  16: null, // Zatím není hotový
  17: null, // Zatím není hotový
  18: null, // Zatím není hotový
  19: null, // Zatím není hotový
  20: null, // Zatím není hotový
  21: null, // Zatím není hotový
  22: null, // Zatím není hotový
  23: null, // Zatím není hotový
  24: null, // Zatím není hotový
};

        if (dayComponents[selectedDay]) {
          return dayComponents[selectedDay];
        }

        return (
          <>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <h2>Den {selectedDay}</h2>
            <p>Toto okénko otevřeme až {selectedDay}. prosince!</p>
            <p>(Bude to stát za to ❤)</p>
          </>
        );
      })()}
    </div>
  </div>
)}

{/* Plovoucí dárek - zobrazí se jen pokud dnešní den ještě není otevřený */}
      {!openedDays.has(currentDay) && currentMonth === 12 && (
        <div className="floating-gift">
          <button 
            className="gift-button"
            onClick={() => {
              document.querySelector('.calendar-grid').scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="gift-icon">🎁</span>
            <span className="gift-text">
              Dnešní dárek čeká
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;