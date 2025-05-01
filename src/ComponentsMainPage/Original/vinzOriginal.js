import React from 'react';
import './vinzOriginalStyles.css';

const VinzOriginal = ({ id, children }) => {
  return (
    <section id={id} className="section">
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default VinzOriginal;