import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './bannerStyles.css';
import Images from '../../images/imageImport.js';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// Constants
const OBSERVER_OPTIONS = {
  threshold: [0, 0.5],
  rootMargin: '-100px 0px 0px 0px'
};

const SETUP_DELAY = 100;
const RETRY_DELAY = 200;

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const observerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoized page configuration
  const config = useMemo(() => {
    // All pages show the same configuration
    return {
      showHome: true,
      showUberVinz: true,
      showShop: true,
      showKontakt: true,
      showIngredients: true,
    };
  }, []);

  // Check if we're on home page
  const isHomePage = useMemo(() => {
    return location.pathname === '/home' || location.pathname === '/';
  }, [location.pathname]);

  // Handle intersection observer callback
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      // Show banner when first section is scrolled past
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        setIsVisible(true);
        setShowIngredients(true);
      } 
      // Hide banner when back at first section
      else if (entry.isIntersecting) {
        setIsVisible(false);
        setShowIngredients(false);
      }
    });
  }, []);

  // Setup intersection observer
  const setupObserver = useCallback(() => {
    const snapContainer = document.querySelector('.snap-container');
      
    if (snapContainer) {
      const sections = Array.from(snapContainer.children);
      const targetSection = sections[0]; // First section

      if (targetSection) {
        observerRef.current = new IntersectionObserver(
          handleIntersection,
          OBSERVER_OPTIONS
        );
        observerRef.current.observe(targetSection);
        return true;
      } else {
        setTimeout(setupObserver, RETRY_DELAY);
        return false;
      }
    } else {
      setTimeout(setupObserver, RETRY_DELAY);
      return false;
    }
  }, [handleIntersection]);

  // Effect to handle scroll events and visibility
  useEffect(() => {
    // Always show banner on non-home pages
    if (!isHomePage) {
      setIsVisible(true);
      setShowIngredients(true);
      return;
    }

    // Setup observer for home page after delay
    const timeoutId = setTimeout(setupObserver, SETUP_DELAY);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [isHomePage, setupObserver]);

  // Handle logo click
  const handleLogoClick = useCallback((e) => {
    e.preventDefault();

    if (isHomePage) {
      // Scroll to top on home page
      const snapContainer = document.querySelector('.snap-container');
      if (snapContainer) {
        snapContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page
      navigate('/home');
    }
  }, [isHomePage, navigate]);

  return (
    <header className={`header-banner ${isVisible ? 'visible' : ''}`} role="banner">
      <nav className="banner-content" aria-label="Hauptnavigation">
        {/* Mint Ingredient */}
        {config.showIngredients && (
          <div className="ingredient-container" aria-hidden="true">
            <div className={`banner-image mint ${showIngredients ? '' : 'fade-out'}`}>
              <img 
                src={Images.Minze} 
                alt="Frische Minze - natürliche Zutat in vinz" 
                className="banner-minze" 
                loading="lazy"
                width="200"
                height="150"
              />
            </div>
          </div>
        )}

        {/* Home Link */}
        {config.showHome && (
          <div className="banner-text home">
            <Link to="/home" className="banner-brand" aria-label="Zur Startseite">
              Home
            </Link>
          </div>
        )}

        {/* Über Vinz Link */}
        {config.showUberVinz && (
          <div className="banner-text uberVinz">
            <Link to="/überVinz" className="banner-brand" aria-label="Über vinz erfahren">
              über vinz.
            </Link>
          </div>
        )}

        {/* Logo */}
        <div className="banner-logo">
          <Link 
            to="/home" 
            onClick={handleLogoClick} 
            className="logo-link"
            aria-label="vinz Logo - Zur Startseite"
          >
            <img 
              src={Images.Logo} 
              alt="vinz - Bio-Limonade Logo" 
              className="banner-logo-image" 
              loading="eager"
              width="120"
              height="80"
            />
          </Link>
        </div>

        {/* Shop Link */}
        {config.showShop && (
          <div className="banner-text shop">
            <a 
              href="https://vinz.sumupstore.com/" 
              className="banner-brand" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="vinz Online-Shop öffnen"
            >
              Shop
            </a>
          </div>
        )}

        {/* Contact Link */}
        {config.showKontakt && (
          <div className="banner-text contact">
            <Link to="/kontakt" className="banner-brand" aria-label="Kontakt aufnehmen">
              Kontakt
            </Link>
          </div>
        )}

        {/* Lemon Ingredient */}
        {config.showIngredients && (
          <div className="ingredient-container" aria-hidden="true">
            <div className={`banner-image lemon ${showIngredients ? '' : 'fade-out'}`}>
              <img 
                src={Images.Zitrone} 
                alt="Frische Zitrone - natürliche Zutat in vinz" 
                className="banner-zitrone" 
                loading="lazy"
                width="200"
                height="150"
              />
            </div>
          </div>
        )} 
      </nav>
    </header>
  );
};

Banner.displayName = 'Banner';

export default Banner;