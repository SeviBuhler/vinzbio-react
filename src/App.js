import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './ComponentsMainPage/Header/header';
import VinzOriginal from './ComponentsMainPage/Original/vinzOriginal.js';
import Banner from './ComponentsMainPage/Banner/banner.js';
import BackgroundWaves from './ComponentsMainPage/Background/backgroundWaves.js';
import VinzLocation from './ComponentsMainPage/vinzLocation/vinzLocation.js';

import useScrollNavigation from './hooks/useScrollNavigation';
import useBottleScroll from './hooks/useBottleScroll';



function App() {
  const [showWaves, setShowWaves] = useState(false);

  useScrollNavigation();
  useBottleScroll();

  useEffect(() => {
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');
      if (!snapContainer) return;

      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;

      setShowWaves(scrollY > viewportHeight * 0.8);
    };

    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (snapContainer) {
        snapContainer.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  return (
    <div className={`App ${showWaves ? 'show-waves' : ''}`}>
      <Banner />
      <BackgroundWaves />
      <div className="snap-container">
        <Header />
        <VinzOriginal id='vinzOriginal'>
        </VinzOriginal>
        <VinzLocation id='vinzLocation'>
        </VinzLocation>
      </div>
    </div>
  );
}

export default App;
