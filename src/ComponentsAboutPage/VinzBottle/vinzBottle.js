import React, { useState, useCallback, useEffect } from 'react';
import './vinzBottle.css';
import vinzFlasche from '../../images/produkt-bilder/produkt-ohne-hintergrund.png';
import Apfelessig from '../../images/ingredients/Apfelessig.png';
import Honig from '../../images/ingredients/Honig.png';
import Ingwer from '../../images/ingredients/Ingwer.png';
import Minze from '../../images/ingredients/Minze.png';
import Zitrone from '../../images/ingredients/Zitrone.png';

// Ingredient Configuration
const INGREDIENT_DETAILS = {
  honig: {
    title: "Honig - Natürlicher Süßstoff",
    shortText: "Natürlicher Süßstoff mit antibakteriellen Eigenschaften",
    longText: "Honig ist ein natürlicher Süßstoff, der seit Jahrtausenden für seine heilenden Eigenschaften geschätzt wird. Er enthält wichtige Antioxidantien und hat antibakterielle sowie entzündungshemmende Wirkungen. Honig kann das Immunsystem stärken, bei der Wundheilung helfen und als natürlicher Energiespender fungieren. In unserem Vinz-Getränk verleiht er nicht nur eine angenehme Süße, sondern unterstützt auch die gesundheitsfördernden Eigenschaften der anderen Zutaten.",
    image: Honig,
    imageAlt: "Honig - natürlicher Süßstoff"
  },
  apfelessig: {
    title: "Apfelessig - Verdauungshelfer",
    shortText: "Unterstützt die Verdauung und den Stoffwechsel",
    longText: "Apfelessig ist ein traditionelles Heilmittel, das aus fermentierten Äpfeln gewonnen wird. Er ist reich an Essigsäure und probiotischen Bakterien, die die Darmgesundheit fördern. Studien zeigen, dass Apfelessig den Blutzuckerspiegel regulieren, den Stoffwechsel ankurbeln und beim Gewichtsmanagement helfen kann. Er unterstützt die Verdauung und kann helfen, den Cholesterinspiegel zu senken. In Vinz sorgt er für den charakteristischen Geschmack und maximale gesundheitliche Vorteile.",
    image: Apfelessig,
    imageAlt: "Apfelessig - Verdauungshelfer"
  },
  zitrone: {
    title: "Zitrone - Vitamin C Booster",
    shortText: "Reich an Vitamin C und Antioxidantien",
    longText: "Zitronen sind wahre Vitamin C-Bomben und enthalten zusätzlich wichtige Flavonoide und Antioxidantien. Sie stärken das Immunsystem, fördern die Kollagenproduktion und haben entgiftende Eigenschaften. Zitronen können helfen, die Eisenaufnahme zu verbessern und haben alkalisierende Wirkungen auf den Körper, obwohl sie sauer schmecken. Der frische Zitronengeschmack in Vinz macht das Getränk nicht nur erfrischend, sondern liefert auch wichtige Nährstoffe für die tägliche Gesundheit.",
    image: Zitrone,
    imageAlt: "Zitrone - Vitamin C Booster"
  },
  ingwer: {
    title: "Ingwer - Entzündungshemmer",
    shortText: "Wirkt entzündungshemmend und verdauungsfördernd",
    longText: "Ingwer ist eine der vielseitigsten Heilpflanzen der Welt. Seine aktiven Verbindungen, insbesondere Gingerol, haben starke entzündungshemmende und antioxidative Eigenschaften. Ingwer kann Übelkeit reduzieren, die Verdauung fördern, Muskelschmerzen lindern und das Immunsystem stärken. Er hat auch thermogene Eigenschaften, die den Stoffwechsel ankurbeln können. In Vinz verleiht Ingwer eine angenehme Schärfe und verstärkt die gesundheitsfördernden Eigenschaften aller anderen Zutaten.",
    image: Ingwer,
    imageAlt: "Ingwer - Entzündungshemmer"
  },
  minze: {
    title: "Minze - Natürlicher Erfrischer",
    shortText: "Erfrischt und beruhigt den Magen",
    longText: "Minze ist nicht nur erfrischend, sondern auch ein kraftvolles Heilkraut. Sie enthält Menthol, das beruhigende und kühlende Eigenschaften hat. Minze kann bei Verdauungsproblemen helfen, Kopfschmerzen lindern und hat antimikrobielle Eigenschaften. Sie kann auch dabei helfen, den Atem zu erfrischen und hat entspannende Wirkungen auf die Muskulatur. In Vinz sorgt Minze für einen erfrischenden Abschluss und unterstützt die verdauungsfördernden Eigenschaften des Getränks.",
    image: Minze,
    imageAlt: "Minze - natürlicher Erfrischer"
  }
};

// Ingredient Component
const IngredientItem = ({ ingredient, onClick }) => {
  const details = INGREDIENT_DETAILS[ingredient];
  
  return (
    <div className={`about-ingredient-${ingredient}`}>
      <div 
        className="about-ingredient-container pulsing"
        onClick={() => onClick(ingredient)}
        role="button"
        tabIndex={0}
        aria-label={`Mehr über ${details.title} erfahren`}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(ingredient);
          }
        }}
      >
        <div className="about-ingredient-flip-inner">
          <div className="about-ingredient-flip-front">
            <img 
              src={details.image} 
              alt={details.imageAlt} 
              className="about-ingredient-image" 
            />
          </div>
          <div className="about-ingredient-flip-back">
            <span className="click-me-text">Klick mich an</span>
          </div>
        </div>
      </div>
      <p className="about-ingredient-label">{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</p>
    </div>
  );
};

// Modal Component
const IngredientModal = ({ isOpen, content, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="ingredient-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="ingredient-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ingredient-modal-header">
          <img 
            src={content.image} 
            alt="" 
            className="ingredient-modal-image"
            aria-hidden="true"
          />
          <h2 id="modal-title" className="ingredient-modal-title">
            {content.title}
          </h2>
          <button 
            className="ingredient-modal-close" 
            onClick={onClose}
            aria-label="Modal schließen"
          >
            ×
          </button>
        </header>
        <div className="ingredient-modal-body">
          <p className="ingredient-modal-text">{content.longText}</p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const VinzBottle = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleIngredientClick = useCallback((ingredient) => {
    const details = INGREDIENT_DETAILS[ingredient];
    setModalContent(details);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setModalContent({}), 300);
  }, []);

  const ingredients = ['honig', 'apfelessig', 'zitrone', 'ingwer', 'minze'];

  return (
    <section className="about-vinz-bottle-section" aria-labelledby="bottle-title">
      <div className="about-bottle-background-wrapper">
        <div className="about-bottle-container">
          
          <header className="about-bottle-header">
            <h2 id="bottle-title" className="about-bottle-title">
              <span className="about-vinz-text">Vinz.</span>
              <span className="about-bottle-subtitle"> - Inhaltsstoffe</span>
            </h2>
          </header>
          
          <figure className="about-bottle-display">
            <img 
              src={vinzFlasche}
              alt="Vinz Original Flasche mit natürlichen Inhaltsstoffen" 
              className="about-bottle-image"
              loading="lazy"
              width="400"
              height="800"
            />
          </figure>

          {/* Connecting lines */}
          {ingredients.map(ingredient => (
            <div 
              key={`line-${ingredient}`}
              className={`about-ingredient-line about-ingredient-line-${ingredient}`}
              aria-hidden="true"
            />
          ))}

          {/* Ingredients */}
          {ingredients.map(ingredient => (
            <IngredientItem 
              key={ingredient}
              ingredient={ingredient}
              onClick={handleIngredientClick}
            />
          ))}

        </div>
      </div>

      <IngredientModal 
        isOpen={modalOpen}
        content={modalContent}
        onClose={closeModal}
      />
    </section>
  );
};

export default VinzBottle;