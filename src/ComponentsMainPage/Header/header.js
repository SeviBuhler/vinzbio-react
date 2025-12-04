import React, { useRef, useEffect, useState, memo } from 'react';
import './headerStyles.css';
import Images from '../../images/imageImport.js';
import useIngredientsAnimation from '../../hooks/useIngredientsAnimation';
import Ingredient from '../../components/common/Ingredient/Ingredient';
import { INGREDIENT_CONFIG, getIngredientPositions } from '../../config/ingredientConfig';
import { animateText, animateElement, hasScrolledPastSection } from '../../utils/animations';

// Animation timing constants
const ANIMATION_TIMING = {
  BOTTLE_DELAY: 300,
  ARCH_DELAY: 1000,
  DOT_DELAY: 1500,
  VINZ_TEXT_DELAY: 1000,
  VINZ_TEXT_INTERVAL: 150,
  ORIGINAL_TEXT_DELAY: 2000,
  ORIGINAL_TEXT_INTERVAL: 120
};

// Animation styles
const ARCH_STYLES = {
  initial: { transform: 'translateY(-300px)', opacity: '0' },
  animated: { 
    transition: 'transform 1.5s ease-out, opacity 0.5s ease-in',
    transform: 'translateY(0)', 
    opacity: '1' 
  }
};

const DOT_STYLES = {
  initial: { opacity: '0', transform: 'scale(0.2)' },
  animated: { 
    transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-in',
    transform: 'scale(1)', 
    opacity: '1' 
  }
};

const Header = memo(() => {
  const archRef = useRef(null);
  const dotRef = useRef(null);
  
  const [vinzText, setVinzText] = useState('');
  const [originalText, setOriginalText] = useState('');

  const ingredientPositions = getIngredientPositions();
  useIngredientsAnimation(ingredientPositions);

  // Initial animations
  useEffect(() => {
    if (hasScrolledPastSection(0.5)) return;

    const arch = archRef.current;
    const dot = dotRef.current;

    // Set initial states for arch and dot
    Object.entries(ARCH_STYLES.initial).forEach(([key, value]) => {
      if (arch) arch.style[key] = value;
    });
    Object.entries(DOT_STYLES.initial).forEach(([key, value]) => {
      if (dot) dot.style[key] = value;
    });

    // Animate elements with delays
    animateElement(arch, ARCH_STYLES.animated, ANIMATION_TIMING.ARCH_DELAY);
    animateElement(dot, DOT_STYLES.animated, ANIMATION_TIMING.DOT_DELAY);
  }, []);

  // Text animations
  useEffect(() => {
    const cleanupVinz = animateText(
      'vinz.', 
      setVinzText, 
      ANIMATION_TIMING.VINZ_TEXT_DELAY, 
      ANIMATION_TIMING.VINZ_TEXT_INTERVAL
    );
    
    const cleanupOriginal = animateText(
      'Original', 
      setOriginalText, 
      ANIMATION_TIMING.ORIGINAL_TEXT_DELAY, 
      ANIMATION_TIMING.ORIGINAL_TEXT_INTERVAL
    );

    return () => {
      cleanupVinz();
      cleanupOriginal();
    };
  }, []);

  return (
    <header id="home" className="header-fullpage">
      {/* Bottle - ✅ Keine refs mehr nötig */}
      <div className='bottle-container'>
        <img
          src={Images.vinzFlasche}
          alt='Bottle of vinzOriginal'
          className='animated-bottle'
          loading="lazy"
        />
      </div>

      {/* Ingredients */}
      <div className='ingredients-container'>
        {INGREDIENT_CONFIG.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            src={ingredient.src}
            alt={ingredient.alt}
            className={ingredient.id}
          />
        ))}
      </div>

      {/* Blue Arch */}
      <div className='blauer-bogen-container'>
        <img
          ref={archRef}
          src={Images.BlauerBogen}
          alt='Blauer Bogen'
          className='blauer-bogen'
          loading="lazy"
        />
      </div>

      {/* Orange Dot */}
      <div className='oranger-punkt-container'>
        <img
          ref={dotRef}
          src={Images.OrangerPunkt} 
          alt='Oranger Punkt'
          className='oranger-punkt'
          loading="lazy"
        />
      </div>
      
      {/* Text */}
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

Header.displayName = 'Header';

export default Header;