import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

/* komponente */
/* mainPage */
import Header from './ComponentsMainPage/Header/header';
import VinzOriginal from './ComponentsMainPage/Original/vinzOriginal.js';
import Banner from './ComponentsMainPage/Banner/banner.js';
import BackgroundWaves from './ComponentsMainPage/Background/backgroundWaves.js';
import VinzLocation from './ComponentsMainPage/vinzLocation/vinzLocation.js';
import VinzFeelings from './ComponentsMainPage/vinzFeelings/vinzFeelings.js';
import VinzShop from './ComponentsMainPage/vinzShop/vinzShop.js';
import Mixologie from './ComponentsMainPage/mixologie/mixologie.js';
/* aboutPage */
import AboutBanner from './ComponentsAboutPage/AboutBanner/aBanner';
import AboutBackground from './ComponentsAboutPage/AboutBackground/aboutBackground';
import VinzEnjoyment from './ComponentsAboutPage/vinzEnjoyment/vinzEnjoyment';
/* contactPage */
import ContactPage from './ComponentsContactPage/ContactPage/contactPage.js';

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
      setShowWaves(scrollY > viewportHeight * 0.3);
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

      setShowWaves(scrollY > viewportHeight * 0.3);
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


  useEffect(() => {
      function updateViewportHeight() {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    }

    updateViewportHeight();

    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    }
  }, []);
  


  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <AnimationContext.Provider value={{ allowSectionAnimations }}>
              <div className={`App ${showWaves ? 'show-waves' : ''}`}>
                <Banner />
                <BackgroundWaves />
                <div className="snap-container">
                  <Header />
                  <VinzOriginal id='vinzOriginal' />
                  <VinzLocation id='vinzLocation' />
                  <VinzFeelings id='vinzFeelings'/>
                  <VinzShop id='vinzShop' />
                  <Mixologie id='mixologie'/>
                </div>
              </div>
            </AnimationContext.Provider>
          } />

          <Route path="/überVinz.ch" element={
            <>
            <AboutBanner />
            <AboutBackground />
            <VinzEnjoyment />
            </>
          } />

          <Route path="/kontakt" element={
            <>
              <Banner />
              <ContactPage id='contactPage'/>
            </>
          }/>
        </Routes>
      </Router>
    );
}

export default App;
