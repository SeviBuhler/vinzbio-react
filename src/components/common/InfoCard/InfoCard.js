import React, { memo } from 'react';
import './InfoCardStyles.css';

const InfoCard = memo(({ image, title, description, className = '' }) => {
  return (
    <div className={`info-element ${className}`}>
      <div className='info-image-container'>
        <img 
          src={image} 
          alt={title} 
          className='info-image'
          loading="lazy"
        />
      </div>
      <div className='info-text'>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

export default InfoCard;