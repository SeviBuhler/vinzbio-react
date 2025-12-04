import { useEffect, useRef } from 'react';

const useIngredientsAnimation = (ingredientPositions) => {
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 567;
    
    // Get all ingredient images
    const apfelessig = document.querySelector('.apfelessig');
    const honig = document.querySelector('.honig');
    const ingwer = document.querySelector('.ingwer');
    const zitrone = document.querySelector('.zitrone');
    const minze = document.querySelector('.minze');
    
    const ingredients = {
      apfelessig,
      honig,
      ingwer,
      zitrone,
      minze
    };

    // Mobile-specific positions
    const mobilePositions = {
      apfelessig: { transform: 'translate(calc(var(--vw) * 25), calc(var(--vh) * 30)) rotate(30deg)', opacity: '1' },
      honig: { transform: 'translate(calc(var(--vw) * 5), calc(var(--vh) * 25)) rotate(15deg)', opacity: '1' },
      ingwer: { transform: 'translate(calc(var(--vw) * -42), calc(var(--vh) * 38)) rotate(-10deg)', opacity: '1' },
      zitrone: { transform: 'translate(calc(var(--vw) * -25), calc(var(--vh) * 30)) rotate(-5deg)', opacity: '1' },
      minze: { transform: 'translate(calc(var(--vw) * -15), calc(var(--vh) * 35)) rotate(-5deg)', opacity: '1' }
    };

    // Set initial states - nur wenn noch nicht animiert
    if (!hasAnimatedRef.current) {
      Object.entries(ingredients).forEach(([type, element]) => {
        if (element) {
          Object.entries(ingredientPositions[type].initial).forEach(([prop, value]) => {
            element.style[prop] = value;
          });
        }
      });
    }

    // Get all ingredients
    const ingredientElements = Object.values(ingredients).filter(Boolean);
    
    // Function to animate ingredients to their final positions
    const animateIngredients = () => {
      Object.entries(ingredients).forEach(([type, element], index) => {
        if (element) {
          setTimeout(() => {
            const finalPosition = isMobile ? mobilePositions[type] : ingredientPositions[type].animated;
            
            Object.entries(finalPosition).forEach(([prop, value]) => {
              element.style[prop] = value;
            });
            
            if (finalPosition.transform) {
              element.dataset.animatedTransform = finalPosition.transform;
            }
          }, 100 + (index * 150));
        }
      });
    };

    // Check if we're in the header section before triggering animation
    const snapContainer = document.querySelector('.snap-container');
    const isInHeaderSection = snapContainer ? 
      snapContainer.scrollTop < window.innerHeight * 0.5 : 
      true;
    
    // Initial animation - nur einmal
    if (!hasAnimatedRef.current && isInHeaderSection) {
      hasAnimatedRef.current = true;
      const ingredientsDelay = 1800;
      setTimeout(animateIngredients, ingredientsDelay);
    } else if (!hasAnimatedRef.current) {
      ingredientElements.forEach(ingredient => {
        if (ingredient) {
          ingredient.style.opacity = '0';
        }
      });
    }
    
    // Setup scroll handler - IMMER registrieren
    const handleScroll = () => {
      if (!snapContainer) return;
      
      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      const isInHeaderSection = scrollY < viewportHeight * 0.5;
      
      const currentIngredients = {
        apfelessig: document.querySelector('.apfelessig'),
        honig: document.querySelector('.honig'),
        ingwer: document.querySelector('.ingwer'),
        zitrone: document.querySelector('.zitrone'),
        minze: document.querySelector('.minze')
      };
      const currentIngredientElements = Object.values(currentIngredients).filter(Boolean);

      if (isInHeaderSection) {
        if (currentIngredientElements[0] && parseFloat(currentIngredientElements[0].style.opacity) < 0.1) {
          Object.entries(currentIngredients).forEach(([type, element], index) => {
            if (element) {
              setTimeout(() => {
                const finalPosition = isMobile ? mobilePositions[type] : ingredientPositions[type].animated;
                Object.entries(finalPosition).forEach(([prop, value]) => {
                  element.style[prop] = value;
                });
                if (finalPosition.transform) {
                  element.dataset.animatedTransform = finalPosition.transform;
                }
              }, 100 + (index * 150));
            }
          });
        }
      } else if (scrollY > viewportHeight * 0.05) {
        const opacity = Math.max(0, 1 - (scrollY - viewportHeight * 0.05) / (viewportHeight * 0.1));
        
        currentIngredientElements.forEach((ingredient) => {
          if (!ingredient) return;
          
          ingredient.style.opacity = opacity.toString();
          
          const animatedTransform = ingredient.dataset.animatedTransform || 'translate(0, 0)';
          const translateMatch = animatedTransform.match(/translate\(([^,]+), ([^)]+)\)/);
          const rotateMatch = animatedTransform.match(/rotate\(([^)]+)\)/);

          let animatedX = translateMatch ? translateMatch[1] : '0px';
          let animatedY = translateMatch ? translateMatch[2] : '0px';
          let rotation = rotateMatch ? rotateMatch[1] : '0deg';
          
          const progress = 1 - opacity;
          
          ingredient.style.transform = `translate(${animatedX}, ${animatedY}) 
                                       translate(${-progress * 5}vw, ${-progress * 5}vh) 
                                       rotate(${rotation})`;
        });
      }
    };
    
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
      
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ingredientPositions]);
};

export default useIngredientsAnimation;