import React from 'react';
import './aboutBackground.css';
import Images from '../../images/imageImport';

const AboutBackground = () => {
  return (
    <div className="about-background-container">
      <img 
        src={Images.Welle3}
        alt="Background Wave"
        className="background-wave"
      />
    </div>
  );
};

export default AboutBackground;