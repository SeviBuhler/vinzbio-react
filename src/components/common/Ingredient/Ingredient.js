import React, { memo } from 'react';
import './IngredientStyles.css';

const Ingredient = memo(({ src, alt, className }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`ingredient ${className}`}
      loading="lazy"
    />
  );
});

Ingredient.displayName = 'Ingredient';

export default Ingredient;