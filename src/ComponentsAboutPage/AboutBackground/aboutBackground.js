import React from 'react';
import './aboutBackground.css';
import Images from '../../images/imageImport';

const AboutBackground = () => {
  return (
    <div 
      className="about-background-container" 
      role="presentation"
      aria-hidden="true"
    >
      <img 
        src={Images.Welle3}
        alt=""
        className="background-wave"
        loading="eager"
      />
    </div>
  );
};

export default AboutBackground;