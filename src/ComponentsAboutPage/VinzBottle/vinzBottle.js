import React, { useState } from 'react';
import './vinzBottle.css';
import vinzFlasche from '../../images/produkt-bilder/produkt-ohne-hintergrund.png';
// INHALTSSTOFF-BILDER IMPORTIEREN
import Apfelessig from '../../images/ingredients/Apfelessig.png';
import Honig from '../../images/ingredients/Honig.png';
import Ingwer from '../../images/ingredients/Ingwer.png';
import Minze from '../../images/ingredients/Minze.png';
import Zitrone from '../../images/ingredients/Zitrone.png';

const VinzBottle = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // LÄNGERE TEXTE FÜR MODAL
  const ingredientDetails = {
    honig: {
      title: "Honig - Natürlicher Süßstoff",
      shortText: "Natürlicher Süßstoff mit antibakteriellen Eigenschaften",
      longText: "Honig ist ein natürlicher Süßstoff, der seit Jahrtausenden für seine heilenden Eigenschaften geschätzt wird. Er enthält wichtige Antioxidantien und hat antibakterielle sowie entzündungshemmende Wirkungen. Honig kann das Immunsystem stärken, bei der Wundheilung helfen und als natürlicher Energiespender fungieren. In unserem Vinz-Getränk verleiht er nicht nur eine angenehme Süße, sondern unterstützt auch die gesundheitsfördernden Eigenschaften der anderen Zutaten.",
      image: Honig
    },
    apfelessig: {
      title: "Apfelessig - Verdauungshelfer",
      shortText: "Unterstützt die Verdauung und den Stoffwechsel",
      longText: "Apfelessig ist ein traditionelles Heilmittel, das aus fermentierten Äpfeln gewonnen wird. Er ist reich an Essigsäure und probiotischen Bakterien, die die Darmgesundheit fördern. Studien zeigen, dass Apfelessig den Blutzuckerspiegel regulieren, den Stoffwechsel ankurbeln und beim Gewichtsmanagement helfen kann. Er unterstützt die Verdauung und kann helfen, den Cholesterinspiegel zu senken. In Vinz sorgt er für den charakteristischen Geschmack und maximale gesundheitliche Vorteile.",
      image: Apfelessig
    },
    zitrone: {
      title: "Zitrone - Vitamin C Booster",
      shortText: "Reich an Vitamin C und Antioxidantien",
      longText: "Zitronen sind wahre Vitamin C-Bomben und enthalten zusätzlich wichtige Flavonoide und Antioxidantien. Sie stärken das Immunsystem, fördern die Kollagenproduktion und haben entgiftende Eigenschaften. Zitronen können helfen, die Eisenaufnahme zu verbessern und haben alkalisierende Wirkungen auf den Körper, obwohl sie sauer schmecken. Der frische Zitronengeschmack in Vinz macht das Getränk nicht nur erfrischend, sondern liefert auch wichtige Nährstoffe für die tägliche Gesundheit.",
      image: Zitrone
    },
    ingwer: {
      title: "Ingwer - Entzündungshemmer",
      shortText: "Wirkt entzündungshemmend und verdauungsfördernd",
      longText: "Ingwer ist eine der vielseitigsten Heilpflanzen der Welt. Seine aktiven Verbindungen, insbesondere Gingerol, haben starke entzündungshemmende und antioxidative Eigenschaften. Ingwer kann Übelkeit reduzieren, die Verdauung fördern, Muskelschmerzen lindern und das Immunsystem stärken. Er hat auch thermogene Eigenschaften, die den Stoffwechsel ankurbeln können. In Vinz verleiht Ingwer eine angenehme Schärfe und verstärkt die gesundheitsfördernden Eigenschaften aller anderen Zutaten.",
      image: Ingwer
    },
    minze: {
      title: "Minze - Natürlicher Erfrischer",
      shortText: "Erfrischt und beruhigt den Magen",
      longText: "Minze ist nicht nur erfrischend, sondern auch ein kraftvolles Heilkraut. Sie enthält Menthol, das beruhigende und kühlende Eigenschaften hat. Minze kann bei Verdauungsproblemen helfen, Kopfschmerzen lindern und hat antimikrobielle Eigenschaften. Sie kann auch dabei helfen, den Atem zu erfrischen und hat entspannende Wirkungen auf die Muskulatur. In Vinz sorgt Minze für einen erfrischenden Abschluss und unterstützt die verdauungsfördernden Eigenschaften des Getränks.",
      image: Minze
    }
  };

  // MODAL ÖFFNEN (NUR BEIM KLICK)
  const handleIngredientClick = (ingredient) => {
    const details = ingredientDetails[ingredient];
    setModalContent(details);
    setModalOpen(true);
  };

  // MODAL SCHLIEßEN
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
  };

  return (
    <section className="about-vinz-bottle-section">
      <div className="about-bottle-background-wrapper">
        <div className="about-bottle-container">
          
          {/* TITEL MIT VINZ STYLING */}
          <h2 className="about-bottle-title">
            <span className="about-vinz-text">Vinz.</span>
            <span className="about-bottle-subtitle">- Inhaltsstoffe</span>
          </h2>
          
          {/* FLASCHE IN DER MITTE */}
          <div className="about-bottle-display">
            <img 
              src={vinzFlasche}
              alt="Vinz Bottle" 
              className="about-bottle-image"
            />
          </div>

          {/* BLAUE LINIEN VON PRODUKTEN ZUR FLASCHE */}
          <div className="about-ingredient-line about-ingredient-line-honig"></div>
          <div className="about-ingredient-line about-ingredient-line-apfelessig"></div>
          <div className="about-ingredient-line about-ingredient-line-zitrone"></div>
          <div className="about-ingredient-line about-ingredient-line-ingwer"></div>
          <div className="about-ingredient-line about-ingredient-line-minze"></div>

          {/* HONIG - LINKS OBEN */}
          <div className="about-ingredient-honig">
            <div 
              className="about-ingredient-container pulsing"
              onClick={() => handleIngredientClick('honig')}
            >
              <div className="about-ingredient-flip-inner">
                <div className="about-ingredient-flip-front">
                  <img src={Honig} alt="Honig" className="about-ingredient-image" />
                </div>
                <div className="about-ingredient-flip-back">
                  <span className="click-me-text">Klick mich an</span>
                </div>
              </div>
            </div>
            <p className="about-ingredient-label">Honig</p>
          </div>

          {/* APFELESSIG - LINKS UNTEN */}
          <div className="about-ingredient-apfelessig">
            <div 
              className="about-ingredient-container pulsing"
              onClick={() => handleIngredientClick('apfelessig')}
            >
              <div className="about-ingredient-flip-inner">
                <div className="about-ingredient-flip-front">
                  <img src={Apfelessig} alt="Apfelessig" className="about-ingredient-image" />
                </div>
                <div className="about-ingredient-flip-back">
                  <span className="click-me-text">Klick mich an</span>
                </div>
              </div>
            </div>
            <p className="about-ingredient-label">Apfelessig</p>
          </div>

          {/* ZITRONE - RECHTS OBEN */}
          <div className="about-ingredient-zitrone">
            <div 
              className="about-ingredient-container pulsing"
              onClick={() => handleIngredientClick('zitrone')}
            >
              <div className="about-ingredient-flip-inner">
                <div className="about-ingredient-flip-front">
                  <img src={Zitrone} alt="Zitrone" className="about-ingredient-image" />
                </div>
                <div className="about-ingredient-flip-back">
                  <span className="click-me-text">Klick mich an</span>
                </div>
              </div>
            </div>
            <p className="about-ingredient-label">Zitrone</p>
          </div>

          {/* INGWER - RECHTS MITTE */}
          <div className="about-ingredient-ingwer">
            <div 
              className="about-ingredient-container pulsing"
              onClick={() => handleIngredientClick('ingwer')}
            >
              <div className="about-ingredient-flip-inner">
                <div className="about-ingredient-flip-front">
                  <img src={Ingwer} alt="Ingwer" className="about-ingredient-image" />
                </div>
                <div className="about-ingredient-flip-back">
                  <span className="click-me-text">Klick mich an</span>
                </div>
              </div>
            </div>
            <p className="about-ingredient-label">Ingwer</p>
          </div>

          {/* MINZE - RECHTS UNTEN */}
          <div className="about-ingredient-minze">
            <div 
              className="about-ingredient-container pulsing"
              onClick={() => handleIngredientClick('minze')}
            >
              <div className="about-ingredient-flip-inner">
                <div className="about-ingredient-flip-front">
                  <img src={Minze} alt="Minze" className="about-ingredient-image" />
                </div>
                <div className="about-ingredient-flip-back">
                  <span className="click-me-text">Klick mich an</span>
                </div>
              </div>
            </div>
            <p className="about-ingredient-label">Minze</p>
          </div>

        </div>
      </div>

      {/* MODAL FÜR DETAILLIERTE INFORMATIONEN */}
      {modalOpen && (
        <div 
          className="ingredient-modal-overlay" 
          onClick={closeModal}
        >
          <div 
            className="ingredient-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ingredient-modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="ingredient-modal-header">
              <img 
                src={modalContent.image} 
                alt={modalContent.title} 
                className="ingredient-modal-image"
              />
              <h3 className="ingredient-modal-title">{modalContent.title}</h3>
            </div>
            <div className="ingredient-modal-body">
              <p className="ingredient-modal-text">{modalContent.longText}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VinzBottle;