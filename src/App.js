import React, { useState } from 'react';
import './App.css';
import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day5';
import Day5 from './days/Day4';
import Day6 from './days/Day6';
import Day7 from './days/Day7';
import Day8 from './days/Day8';
import Day9 from './days/Day9';
import Day10 from './days/Day10';
import Day11 from './days/Day11';
import Day12 from './days/Day12';
import Day13 from './days/Day13';
import Day14 from './days/Day14';
import Day15 from './days/Day15';
import Day16 from './days/Day16';
import Day17 from './days/Day17';
import Day18 from './days/Day18';
import Day19 from './days/Day19';
import Day20 from './days/Day20';
import Day21 from './days/Day21';
import Day22 from './days/Day22';
import Day23 from './days/Day23';
import Day24 from './days/Day24';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
 const [openedDays, setOpenedDays] = useState(() => {
  const saved = localStorage.getItem('kailuAdventOpened');
  return saved ? new Set(JSON.parse(saved)) : new Set();
});
  
 // Automatické datum
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // getMonth() vrací 0-11, proto +1

const days = Array.from({ length: 24 }, (_, i) => i + 1);

const handleDayClick = (day) => {
  // Otevře se jen okénko dnešního dne v prosinci
  if (currentMonth === 12 && day === currentDay) {
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
  // Pouze dnešní den je dostupný
  if (currentMonth === 12 && day === currentDay) return 'available';
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
  5: <Day5 />,
  6: <Day6 />,
  7: <Day7 />,
  8: <Day8 />,
  9: <Day9 />,
  10: <Day10 />,
  11: <Day11 />,
  12: <Day12 />,
  13: <Day13 />,
  14: <Day14 />,
  15: <Day15 />,
  16: <Day16 />,
  17: <Day17 />,
  18: <Day18 />,
  19: <Day19 />,
  20: <Day20 />,
  21: <Day21 />,
  22: <Day22 />,
  23: <Day23 />,
  24: <Day24 />,
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