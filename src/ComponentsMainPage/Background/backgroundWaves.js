import React from 'react';
import './backgroundWavesStyles.css';
import Images from '../../images/imageImport.js';

const BackgroundWaves = () => {
  return (
    <div className="background-waves-container">
      <img src={Images.WelleOrange} alt='Background Waves' className='background-waves' />
    </div>
  );
};

export default BackgroundWaves;