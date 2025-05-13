import React from 'react';
import './aboutBackgroundStyles.css';
import backgroundWave from './images/Welle Blau Eck dick.png';

const AboutBackground = () => {
  return (
    <div className="about-background-container">
      <img
        src={backgroundWave}
        alt=""
        className="about-background"
      />
    </div>
  );
};

export default AboutBackground;