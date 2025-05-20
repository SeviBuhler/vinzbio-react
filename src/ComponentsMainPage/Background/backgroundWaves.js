import React from 'react';
import './backgroundWavesStyles.css';
import Images from '../../images/imageImport.js';

const BackgroundWaves = () => {
  return (
    <>
      <div className="background-waves-container background-waves-top">
        <img src={Images.WelleOrange} alt='Background Waves Top' className='background-waves top-wave' loading="lazy" />
      </div>
      <div className="background-waves-container background-waves-bottom">
        <img src={Images.WelleOrange} alt='Background Waves Bottom' className='background-waves bottom-wave' loading="lazy" />
      </div>
    </>
  );
};

export default BackgroundWaves;