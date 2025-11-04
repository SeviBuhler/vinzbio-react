import React, { useState, useEffect, useRef, useCallback } from 'react';
import './bannerStyles.css';
import Images from '../../images/imageImport.js';
import { useLocation } from 'react-router-dom';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const timerRef = useRef(null);
  const location = useLocation(null);

  // Debug funciton
 const debugLog = useCallback((message, data = {}) => {
    console.log(`[Banner Debug] ${message}`, {
      pathname: location.pathname,
      isVisible,
      showIngredients,
      ...data
    });
  }, [location.pathname, isVisible, showIngredients]);


  // Determine current page and what links to show
  const getCurrentPageConfig = () => {
    const currentPath = location.pathname;

    switch(currentPath) {
      case '/home':
      case '/':
        return {
          showHome: true,
          showUberVinz: true,
          showShop: true,
          showKontakt: true,
          showIngredients: true,
        };
      case '/überVinz':
        return {
          showHome: true,
          showUberVinz: true,
          showShop: true,
          showKontakt: true,
          showIngredients: true,
        };
      case '/kontakt':
        return {
          showHome: true,
          showUberVinz: true,
          showShop: true,
          showKontakt: true,
          showIngredients: true,
        };
      default: 
        return {
          showHome: true,
          showUberVinz: true,
          showShop: true,
          showKontakt: true,
          showIngredients: true,
        };
      }
  };

  const config = getCurrentPageConfig();

  // Effect to handle scroll events and visibility of the banner
  useEffect(() => {
    const currentPath = location.pathname;
    const currentTimer = timerRef.current;

    // always show banner on non-home pages
    if (currentPath !== '/home' && currentPath !== '/') {
      debugLog('Non-home page detected, showing banner and ingredients immediately.');
      setIsVisible(true);
      setShowIngredients(true);
      return;
    }

    // Beobachte die ERSTE Section (Title Page) 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          debugLog('Intersection detected', { 
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingTop: entry.boundingClientRect.top
          });

          // Wenn die ERSTE Section NICHT mehr sichtbar ist, zeige Banner
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setIsVisible(true);
            setShowIngredients(true);
          } 
          // Wenn wir zurück zur ersten Section scrollen, verstecke Banner
          else if (entry.isIntersecting) {
            setIsVisible(false);
            setShowIngredients(false);
          }
        });
      },
      {
        threshold: [0, 0.5],
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    // Warte kurz, damit DOM vollständig geladen ist
    const setupObserver = () => {
    const snapContainer = document.querySelector('.snap-container');
      
    if (snapContainer) {
      const sections = Array.from(snapContainer.children);
      const targetSection = sections[0]; // Erste Section = Vinz Original

      if (targetSection) {
        debugLog('Observing section', { 
          sectionFound: true, 
          sectionIndex: 0,
          totalSections: sections.length,
          targetId: targetSection.id || 'no-id',
          targetClass: targetSection.className || 'no-class'
        });
        observer.observe(targetSection);
      } else {
        debugLog('Target section not found, retrying...', { 
          totalSections: sections.length 
        });
        setTimeout(setupObserver, 200);
      }
    } else {
      debugLog('Snap-container not found, retrying...');
      setTimeout(setupObserver, 200);
    }
  };

    // Starte nach kurzem Delay
    const timeoutId = setTimeout(setupObserver, 100);

    return () => {
      debugLog('Cleaning up intersection observer.');
      observer.disconnect();
      clearTimeout(timeoutId);
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
    };
  }, [location.pathname, debugLog]);

  //Handle click on the logo to navigate to the main page or only to the top of the page
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === '/home' || location.pathname === '/') {
      const snapContainer = document.querySelector('.snap-container');
      if (snapContainer) {
        snapContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = '/home';
    }
  }

  return (
    <div className={`header-banner ${isVisible ? 'visible' : ''}`}>
      <div className="banner-content">
        {/* Mint */}
        {config.showIngredients && (
          <div className="ingredient-container">
            {showIngredients ? (
              <div className='banner-image mint'>
               <img src={Images.Minze} alt="Minze" className="banner-minze" loading="lazy" />
              </div>
            ) : (
              <div className='banner-image fade-out'>
                <img src={Images.Minze} alt="Minze" className="banner-minze" loading="lazy" />
              </div>
            )}
          </div>
        )}

        {/* Home link - show on non-home pages */}
        {config.showHome && (
          <div className="banner-text home">
            <a href="/home" className="banner-brand">Home</a>
          </div>
        )}

        {/* Über Vinz link - show on non-about pages */}
        {config.showUberVinz && (
          <div className="banner-text uberVinz">
            <a href="/überVinz" className="banner-brand">über vinz.</a>
          </div>
        )}

        {/* Logo - always visible */}
        <div className="banner-logo">
          <a href='/home' onClick={handleLogoClick} className='logo-link'>
            <img src={Images.Logo} alt="Vinz Logo" className="banner-logo" loading="lazy" />
          </a>
        </div>

        {/* Shop link - conditional */}
        {config.showShop && (
          <div className="banner-text shop">
            <a href="https://vinz.sumupstore.com/" className="banner-brand" target='_blank' rel='noreferrer'>Shop</a>
          </div>
        )}

        {/* Contact link - show on non-contact pages */}
        {config.showKontakt && (
          <div className='banner-text contact'>
            <a href='/kontakt' className='banner-brand'>Kontakt</a>
          </div>
        )}

        {/* Lemon */}
        {config.showIngredients && (
          <div className="ingredient-container">
            {showIngredients ? (
              <div className='banner-image lemon'>
                <img src={Images.Zitrone} alt="Zitrone" className="banner-zitrone" loading="lazy" />
              </div>
            ) : (
              <div className='banner-image fade-out'>
                <img src={Images.Zitrone} alt="Zitrone" className="banner-zitrone" loading="lazy" />
              </div>
            )}
          </div>
        )} 

      </div>
    </div>
  );
};

export default Banner;