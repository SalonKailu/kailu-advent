import React, { useEffect } from 'react';

const Day20 = () => {
  useEffect(() => {
    // Přesměruje ve stejném okně
    window.location.href = 'https://www.kailushop.cz/lednovavyzva/';
  }, []);

  return (
    <div style={{ 
      padding: '40px 20px', 
      textAlign: 'center',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💌</div>
      <p style={{ color: '#666' }}>Přesměrovávám...</p>
    </div>
  );
};

export default Day20;