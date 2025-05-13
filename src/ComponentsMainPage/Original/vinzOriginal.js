import React, { useState, useEffect, useContext } from 'react';
import './vinzOriginalStyles.css';
import Images from '../../images/imageImport.js';
import { AnimationContext } from '../../App.js';

const VinzOriginal = ({ id }) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const { allowSectionAnimations } = useContext(AnimationContext);

  const infoElements = [
    {
      id: 'bio',
      image: Images.Bio,
      title: '100% Bio',
      description: 'Aus biologischem Anbau',
      delay: 0
    },
    {
      id: 'natural',
      image: Images.Natural,
      title: 'Natural',
      description: 'Nur natürliche Zutaten',
      delay: 300
    },
    {
      id: 'lowCalorie',
      image: Images.LowCalorie,
      title: 'Low Calories',
      description: 'Weniger als 10 Kalorien pro 100ml',
      delay: 600
    },
    {
      id: 'noSugar',
      image: Images.NoSugar,
      title: 'No Added Sugar',
      description: 'Ohne zugesetzten Zucker',
      delay: 900
    }
  ];

  // Animation for info elements
  useEffect(() => {
    if (!allowSectionAnimations) {
      setAnimationStarted(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setAnimationStarted(true);
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [id, allowSectionAnimations]);

  return (
    <section id={id} className="original-section">
      <div className="original-section-content">
        {/* Add this wrapper div */}
        <div className="vinz-original-wrapper">
          <div className='vinz-original-container'>
            <h2 className="original-section-title">Vinz. - Original</h2>
            <p className="section-description">
              Frisch, natürlich und kompromisslos. Die Kombination aus Zitrone, Honig, Apfelessig, Ingwer und Minze schmeckt nicht nur hervorragend, sondern gibt dir genau dass, was dein Körper verdient. 
              <br /> 
              <strong>vinz.</strong> wird in der Schweiz hergestellt und ausschliesslich mit frischen Zutaten welche aus 100% biologischer Landwirtschaft stammen. Dazu verzichten wir auf Zusatzstoffe wie Zucker, Aroma, oder Konzentrate, sodass nicht nur du sondern auch dein Körper es einfach nur geniessen könnt.
              Also erfrisch di mit vinz. – Fühlsch es?
            </p>
            <a
              href='https://vinz.sumupstore.com/'
              className='shop-button'
              target='_blank'
              rel='noreferrer'
            >
              Bestell jetzt
            </a>
          </div>
          
          {/* Keep the info container outside but still within the wrapper */}
          <div className={`info-container ${animationStarted ? 'animation-started' : ''}`}>
            {infoElements.map((info) => (
              <div 
                key={info.id}
                className='info-element'
                style={{
                  transitionDelay: `${info.delay}ms`,
                  animationDelay: `${info.delay}ms`,
                }}  
              >
                <div className='info-image-container'>
                  <img src={info.image} alt={info.title} className='info-image' />
                </div>
                <div className='info-text'>
                  <h3>{info.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VinzOriginal;