import React, { useState, useEffect, createContext } from 'react';
import './App.css';

/* komponente */
import Header from './ComponentsMainPage/Header/header';
import VinzOriginal from './ComponentsMainPage/Original/vinzOriginal.js';
import Banner from './ComponentsMainPage/Banner/banner.js';
import BackgroundWaves from './ComponentsMainPage/Background/backgroundWaves.js';
import VinzLocation from './ComponentsMainPage/vinzLocation/vinzLocation.js';

/* hooks */
import useScrollNavigation from './hooks/useScrollNavigation';
import useBottleScroll from './hooks/useBottleScroll';

export const AnimationContext = createContext();

function App() {
  const [showWaves, setShowWaves] = useState(false);
  const [allowSectionAnimations, setAllowSectionAnimations] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useScrollNavigation();
  useBottleScroll();

  // Add this effect to handle initial load state
  useEffect(() => {
    // Check if we're already scrolled down on initial load
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Set initial states based on where the page loaded
      setShowWaves(scrollY > viewportHeight * 0.8);
      setAllowSectionAnimations(scrollY > viewportHeight * 0.5);
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');
      if (!snapContainer) return;

      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;

      setShowWaves(scrollY > viewportHeight * 0.8);
      setAllowSectionAnimations(scrollY > viewportHeight * 0.5);
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
  }, [initialLoadComplete]);

  return (
    <AnimationContext.Provider value={{ allowSectionAnimations }}>
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
    </AnimationContext.Provider>
  );
}

export default App;
