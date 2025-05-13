import React from 'react';
import './aBanner.css';
import Images from '../../images/imageImport.js';

const AboutBanner = () => {
  return (
    <div className="about-header-banner">
      <div className="about-banner-content">
        <div className="about-ingredient-container">
          <div className='about-banner-image'>
            <img src={Images.Minze} alt="Minze" className="about-banner-minze" />
          </div>
        </div>
        <div className="about-banner-text">
          <a href="/" className="about-banner-brand">vinz.</a>
        </div>
        <div className="about-banner-logo">
          <a href="/" className='about-logo-link'>
            <img src={Images.Logo} alt="Vinz Logo" className="about-banner-logo" />
          </a>
        </div>
        <div className="about-banner-text">
          <a href="https://vinz.sumupstore.com/" className="about-banner-brand" target='_blank' rel='noreferrer'>Bstell's jetzt!</a>
        </div>
        <div className="about-ingredient-container">
          <div className='about-banner-image'>
            <img src={Images.Zitrone} alt="Zitrone" className="about-banner-zitrone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;