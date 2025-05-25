import React, { useRef, useEffect, useState, useMemo, memo } from 'react';
import './headerStyles.css';
import Images from '../../images/imageImport.js';
import useIngredientsAnimation from '../../hooks/useIngredientsAnimation';

const Header = memo(() => {
  const bottleRef = useRef(null);
  const blauerBogenRef = useRef(null);
  const orangerPunktRef = useRef(null);
  const [vinzText, setVinzText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const fullVinzText = 'vinz.';
  const fullOriginalText = 'Original';

  // Single source of truth for ingredient positions
  const ingredientPositions = useMemo(() => ({
    apfelessig: {
      initial: { transform: 'translate(-50%, -50%) rotate(-15deg)', opacity: '0' },
      animated: { transform: 'translate(3vw, -20vh) rotate(20deg)', opacity: '1' }
    },
    honig: {
      initial: { transform: 'translate(-50%, -50%) rotate(-20deg)', opacity: '0' },
      animated: { transform: 'translate(3vw, 5vh) rotate(20deg)', opacity: '1' }
    },
    ingwer: {
      initial: { transform: 'translate(-50%, -50%) rotate(15deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, 6vh) rotate(5deg)', opacity: '1' }
    },
    zitrone: {
      initial: { transform: 'translate(-50%, -50%) rotate(45deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, -10vh) rotate(15deg)', opacity: '1' }
    },
    minze: {
      initial: { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, 20vh) rotate(-20deg)', opacity: '1' }
    }
  }), []);

  // Use the extracted ingredient animation hook
  useIngredientsAnimation(ingredientPositions);

  // Animation for the bottle, arch and orange dot
  useEffect(() => {
    // Check if we're already scrolled down
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer && snapContainer.scrollTop > window.innerHeight * 0.5) {
      return;
    }

    const bottle = bottleRef.current;
    const blauerBogen = blauerBogenRef.current;
    const orangerPunkt = orangerPunktRef.current;

    // Force reflow before setting initial states
    void document.body.offsetHeight;

    // Initial states
    if (bottle) {
      bottle.style.transform = 'translate(-50%, -250vh)';
      bottle.style.opacity = '1';
      void bottle.offsetHeight;
    }
    
    if (blauerBogen) {
      blauerBogen.style.transform = 'translateY(-300px)';
      blauerBogen.style.opacity = '0';
      void blauerBogen.offsetHeight;
    }
    
    if (orangerPunkt) {
      orangerPunkt.style.opacity = '0';
      orangerPunkt.style.transform = 'scale(0.2)';
      void orangerPunkt.offsetHeight;
    }

    // Animation sequence
    // 1. Bottle flies in
    setTimeout(() => {
      if (bottle) bottle.style.transform = 'translate(-50%, -50%)';
    }, 300);

    // 2. Blue arch appears
    setTimeout(() => {
      if (blauerBogen) {
        blauerBogen.style.transition = 'transform 1.5s ease-out, opacity 0.5s ease-in';
        blauerBogen.style.transform = 'translateY(0)';
        blauerBogen.style.opacity = '1';
      }
    }, 1000);
    
    // 3. Orange dot appears
    setTimeout(() => {
      if (orangerPunkt) {
        orangerPunkt.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-in';
        orangerPunkt.style.transform = 'scale(1)';
        orangerPunkt.style.opacity = '1';
      }
    }, 1500);
  }, []);

  // Text animation for "vinz."
  useEffect(() => {
    let currentIndex = 0;
    const startDelay = 1000;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullVinzText.length) {
          setVinzText(fullVinzText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 150)

      return () => clearInterval(interval);
    }, startDelay);
  }, []);

  // Text animation for "Original"
  useEffect(() => {
    let currentIndex = 0;
    const startDelay = 2000;
    
    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullOriginalText.length) {
          setOriginalText(fullOriginalText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 120); 

      return () => clearInterval(interval);
    }, startDelay);
  }, []);

  return (
    <header id="home" className="header-fullpage">
      <div className='bottle-container'>
        <img
          ref={bottleRef}
          src={Images.vinzFlasche}
          alt='Bottle of vinzOriginal'
          className='animated-bottle'
          loading="lazy"
        />
      </div>

      <div className='ingredients-container'>
        {/* Right side ingredients */}
        <img src={Images.Apfelessig} alt="Ingredients Apfelessig" className="apfelessig" loading="lazy" />
        <img src={Images.Honig} alt='Ingredients Honig' className='honig' loading="lazy" />
        
        {/* Left side ingredients */}
        <img src={Images.Ingwer} alt='Ingredients Ingwer' className='ingwer' loading="lazy" />
        <img src={Images.Zitrone} alt='Ingredients Zitrone' className='zitrone' loading="lazy" />
        <img src={Images.Minze} alt='Ingredients Minze' className='minze' loading="lazy" />
      </div>

      <div className='blauer-bogen-container'>
        <img
          ref={blauerBogenRef}
          src={Images.BlauerBogen}
          alt='Blauer Bogen'
          className='blauer-bogen'
          loading="lazy"
        />
      </div>

      <div className='oranger-punkt-container'>
        <img
          ref={orangerPunktRef}
          src={Images.OrangerPunkt} 
          alt='Oranger Punkt'
          className='oranger-punkt'
          loading="lazy"
        />
      </div>
      
      <div className='header-text'>
        <div className="header-text-content">
          <div className='vinz-title'>
            <h1 className='vinz'>{vinzText}</h1>
          </div>
        </div>
        <div className='header-text-content2'>
          <div className='original-title'>
            <h1 className='original'>{originalText}</h1>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;