import React, { useContext, memo } from 'react';
import './vinzOriginalStyles.css';
import { AnimationContext } from '../../App.js';
import InfoCard from '../../components/common/InfoCard/InfoCard';
import { VINZ_ORIGINAL_CONFIG, INFO_ELEMENTS } from '../../config/vinzOriginalConfig';
import { useStaggeredAnimation } from '../../hooks/useStaggeredAnimation';

const VinzOriginal = memo(({ id }) => {
  const { allowSectionAnimations } = useContext(AnimationContext);
  const [animationStarted] = useStaggeredAnimation(id, allowSectionAnimations);

  return (
    <section id={id} className="original-section">
      <div className="original-section-content">
        <div className="vinz-original-wrapper">
          <div className='vinz-original-container'>
            <h2 className="original-section-title">
              <span className="vinz-text">{VINZ_ORIGINAL_CONFIG.title.vinz}</span>
              <span className="original-text">{VINZ_ORIGINAL_CONFIG.title.original}</span>
            </h2>
            
            <p className="section-description">
              {VINZ_ORIGINAL_CONFIG.description}
            </p>
            
            <a
              href={VINZ_ORIGINAL_CONFIG.shopUrl}
              className='shop-button'
              target='_blank'
              rel='noopener noreferrer'
              aria-label="Vinz Original jetzt im Shop bestellen"
            >
              {VINZ_ORIGINAL_CONFIG.shopButtonText}
            </a>
          </div>
          
          <div 
            className={`info-container ${animationStarted ? 'animation-started' : ''}`}
            role="list"
            aria-label="Produkteigenschaften"
          >
            {INFO_ELEMENTS.map((info, index) => (
              <InfoCard
                key={info.id}
                image={info.image}
                className={`info-element-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

VinzOriginal.displayName = 'VinzOriginal';

export default VinzOriginal;