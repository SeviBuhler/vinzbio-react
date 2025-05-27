import React, { useState, useEffect, useRef } from 'react';
import './bannerStyles.css';
import Images from '../../images/imageImport.js';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnMainPage] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');
      if (!snapContainer) return;
      
      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.2;
      
      // Debounce the scroll updates
      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        const shouldShowBanner = scrollY > threshold;
        
        if (shouldShowBanner) {
          // Show banner immediately
          setIsVisible(true);
          
          // Show ingredients with delay
          setTimeout(() => {
            setShowIngredients(true);
          }, 50);
        } else {
          // Hide ingredients immediately
          setShowIngredients(false);
          
          // Hide banner with delay
          setTimeout(() => {
            setIsVisible(false);
          }, 100);
        }
      }, 10);
    };
    
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
    
    return () => {
      if (snapContainer) {
        snapContainer.removeEventListener('scroll', handleScroll);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  //Handle click on the logo to navigate to the main page or only to the top of the page
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (isOnMainPage) {
      const snapContainer = document.querySelector('.snap-container');
      if (snapContainer) {
        snapContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = '/';
    }
  }

  return (
    <div className={`header-banner ${isVisible ? 'visible' : ''}`}>
      <div className="banner-content">
      <div className="ingredient-container">
        {showIngredients ? (
          <div className='banner-image'>
           <img src={Images.Minze} alt="Minze" className="banner-minze" loading="lazy" />
          </div>
        ) : (
          <div className='banner-image fade-out'>
            <img src={Images.Minze} alt="Minze" className="banner-minze" loading="lazy" />
          </div>
        )}
      </div>
        <div className="banner-text">
          <a href="überVinz.ch" className="banner-brand">über vinz.</a>
        </div>
        <div className="banner-logo">
          <a href='/' onClick={handleLogoClick} className='logo-link'>
            <img src={Images.Logo} alt="Vinz Logo" className="banner-logo" loading="lazy" />
          </a>
        </div>
        <div className="banner-text">
          <a href="https://vinz.sumupstore.com/" className="banner-brand" target='_blank' rel='noreferrer'>Shop</a>
        </div>
        <div className="ingredient-container">
          {showIngredients ? (
            <div className='banner-image'>
              <img src={Images.Zitrone} alt="Zitrone" className="banner-zitrone" loading="lazy" />
            </div>
          ) : (
            <div className='banner-image fade-out'>
              <img src={Images.Zitrone} alt="Zitrone" className="banner-zitrone" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;