import React, { useRef, useEffect, useState } from 'react';

function ScratchCard({ number, onReveal, isRevealed }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratched, setScratched] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Nastavení rozměrů
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Vykreslení šedé vrstvy
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d4a5a5');
    gradient.addColorStop(1, '#c49393');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Text "?"
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px DM Serif Display';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', rect.width / 2, rect.height / 2);

    // Nastavení pro škrábání
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPosition(e);

    // Škrábání
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Zkontroluj procent odkryto
    checkScratchedArea();
  };

  const checkScratchedArea = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    const percentScratched = (transparent / (pixels.length / 4)) * 100;
    setScratched(percentScratched);

    // Pokud >40% odkryto → automaticky odkryj celé
    if (percentScratched > 40 && !isRevealed) {
      onReveal();
    }
  };

  const handleStart = (e) => {
    if (isRevealed) return;
    setIsDrawing(true);
    draw(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  if (isRevealed) {
    return (
      <div className="scratch-box revealed">
        <span className="scratch-number">{number} Kč</span>
      </div>
    );
  }

  return (
    <div className="scratch-box" style={{ position: 'relative' }}>
      <span className="scratch-number" style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#faa4a6'
      }}>
        {number} Kč
      </span>
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={draw}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={draw}
        onTouchEnd={handleEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 1,
          borderRadius: '15px'
        }}
      />
    </div>
  );
}

export default ScratchCard;