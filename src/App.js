import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

/* Components */
import Header from './ComponentsMainPage/Header/header';
import VinzOriginal from './ComponentsMainPage/Original/vinzOriginal.js';
import Banner from './ComponentsMainPage/Banner/banner.js';
import BackgroundWaves from './ComponentsMainPage/Background/backgroundWaves.js';
import VinzLocation from './ComponentsMainPage/vinzLocation/vinzLocation.js';
import VinzFeelings from './ComponentsMainPage/vinzFeelings/vinzFeelings.js';
import VinzShop from './ComponentsMainPage/vinzShop/vinzShop.js';
import Mixologie from './ComponentsMainPage/mixologie/mixologie.js';
import AboutBackground from './ComponentsAboutPage/AboutBackground/aboutBackground';
import VinzEnjoyment from './ComponentsAboutPage/vinzEnjoyment/vinzEnjoyment';
import InstagramFeedeed from './ComponentsAboutPage/InstagramFeed/instagramFeed.js';
import VinzBottle from './ComponentsAboutPage/VinzBottle/vinzBottle.js';
import ContactPage from './ComponentsContactPage/ContactPage/contactPage.js';
import PageTransition from './pageTransition/PageTransition.js';
import ScrollContainer from './components/common/ScrollContainer/ScrollContainer.js';

/* Hooks */
import useScrollNavigation from './hooks/useScrollNavigation';
import useBottleScroll from './hooks/useBottleScroll';
import { useViewport } from './hooks/useViewport';

export const AnimationContext = createContext();

function AppContent() {
  const [showWaves, setShowWaves] = useState(false);
  const [allowSectionAnimations, setAllowSectionAnimations] = useState(false);
  const viewport = useViewport();
  const location = useLocation();

  useScrollNavigation();
  useBottleScroll();

  // Reset viewport and cleanup on route change
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Reset snap containers
    const snapContainer = document.querySelector('.snap-container');
    const aboutContainer = document.querySelector('.about-snap-container');
    const contactContainer = document.querySelector('.contact-snap-container');
    
    if (snapContainer) snapContainer.scrollTop = 0;
    if (aboutContainer) aboutContainer.scrollTop = 0;
    if (contactContainer) contactContainer.scrollTop = 0;
    
    // Update viewport
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    
    // Cleanup
    document.body.style.overflow = '';
    
    // Reset waves for non-home pages
    const isHomePage = location.pathname === '/home' || location.pathname === '/';
    if (!isHomePage) {
      setShowWaves(false);
      setAllowSectionAnimations(false);
    }
    
  }, [location.pathname]);

  const handleMainScroll = useCallback((e) => {
    const scrollY = e.target.scrollTop;
    const viewportHeight = viewport.height;

    setShowWaves(scrollY > viewportHeight * 0.3);
    setAllowSectionAnimations(scrollY > viewportHeight * 0.5);
  }, [viewport.height]);

  const animationContextValue = useMemo(
    () => ({ allowSectionAnimations, viewport }),
    [allowSectionAnimations, viewport]
  );

  return (
    <>
      <Banner />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          <Route path="/home" element={
            <AnimationContext.Provider value={animationContextValue}>
              <div className={`App ${showWaves ? 'show-waves' : ''}`}>
                <BackgroundWaves />
                <ScrollContainer className="snap-container" onScroll={handleMainScroll}>
                  <Header />
                  <VinzOriginal id='vinzOriginal' />
                  <VinzLocation id='vinzLocation' />
                  <VinzFeelings id='vinzFeelings'/>
                  <VinzShop id='vinzShop' />
                  <Mixologie id='mixologie'/>
                </ScrollContainer>
              </div>
            </AnimationContext.Provider>
          } />

          <Route path="/überVinz" element={
            <ScrollContainer className="about-snap-container">
              <AboutBackground />
              <VinzEnjoyment />
              <VinzBottle />
              <InstagramFeedeed />
            </ScrollContainer>
          } />

          <Route path="/kontakt" element={
            <ScrollContainer className="contact-snap-container">
              <ContactPage id='contactPage'/>
            </ScrollContainer>
          }/>
        </Routes>
      </PageTransition>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;