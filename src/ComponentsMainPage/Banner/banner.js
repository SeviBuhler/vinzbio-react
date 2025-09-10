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

    // always show banner on non-home pages
    if (currentPath !== '/home' && currentPath !== '/') {
      debugLog('Non-home page detected, showing banner and ingredients immediately.');
      setIsVisible(true);
      setShowIngredients(true);
      return;
    }

    // Apply scroll-based visibility logic
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');
      if (!snapContainer) {
        debugLog('No snap-container found, cannot handle scroll.');
        return;
      }

      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.2;

      debugLog('Scroll event detected.', { scrollY, viewportHeight, threshold, shouldShow: scrollY > threshold });
      
      // Debounce the scroll updates
      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        const shouldShowBanner = scrollY > threshold;

        debugLog('Setting banner visibility', {
          shouldShowBanner,
          previousIsVisible: isVisible,
        });
        
        if (shouldShowBanner) {
          setIsVisible(true);
          setTimeout(() => {
            debugLog('Showing ingredients after banner is visible.');
            setShowIngredients(true);
          }, 50);
        } else {
          debugLog('Hiding ingredients and banner.');
          setShowIngredients(false);
          setTimeout(() => {
            setIsVisible(false);
          }, 100);
        }
      }, 10);
    };
    
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      debugLog('Adding scroll listener to snap-container');
      snapContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    } else {
      debugLog('No snap-container found on initial load.');
    }
    
    return () => {
      debugLog('Cleaning up scroll listener and timer.');
      if (snapContainer) {
        snapContainer.removeEventListener('scroll', handleScroll);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname, debugLog, isVisible]);

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