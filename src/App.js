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
import AboutBackground from './ComponentsAboutPage/AboutBackground/aboutBackground';
import VinzEnjoyment from './ComponentsAboutPage/vinzEnjoyment/vinzEnjoyment';
import InstagramFeedeed from './ComponentsAboutPage/InstagramFeed/instagramFeed.js';
import VinzBottle from './ComponentsAboutPage/VinzBottle/vinzBottle.js';
/* contactPage */
import ContactPage from './ComponentsContactPage/ContactPage/contactPage.js';
/* page transition */
import PageTransition from './pageTransition/PageTransition.js';

/* hooks */
import useScrollNavigation from './hooks/useScrollNavigation';
import useBottleScroll from './hooks/useBottleScroll';


export const AnimationContext = createContext();

function App() {
  const [showWaves, setShowWaves] = useState(false);
  const [allowSectionAnimations, setAllowSectionAnimations] = useState(false);

  useScrollNavigation();
  useBottleScroll();


  // Viewport Height Update
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
    };
  }, []);

  // Scroll Handler für Waves und Animations
  useEffect(() => {
    const snapContainer = document.querySelector('.snap-container');
    if (!snapContainer) return;

    const handleScroll = () => {
      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;

      setShowWaves(scrollY > viewportHeight * 0.3);
      setAllowSectionAnimations(scrollY > viewportHeight * 0.5);
    };

    // Initial state setzen UND Listener hinzufügen
    handleScroll();
    snapContainer.addEventListener('scroll', handleScroll);

    return () => snapContainer.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
      <Router>
        <Banner />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={
              <AnimationContext.Provider value={{ allowSectionAnimations }}>
                <div className={`App ${showWaves ? 'show-waves' : ''}`}>
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

            <Route path="/überVinz" element={
              <>
              <Banner />
              <div className="about-snap-container">
                <AboutBackground />
                <VinzEnjoyment />
                <VinzBottle />
                <InstagramFeedeed />
              </div>
              </>
            } />

            <Route path="/kontakt" element={
              <>
                <Banner />
                <div className='contact-snap-container'>
                  <ContactPage id='contactPage'/>
                </div>
              </>
            }/>
          </Routes>
        </PageTransition>
      </Router>
    );
}

export default App;
