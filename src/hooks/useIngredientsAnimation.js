import { useEffect } from 'react';

const useIngredientsAnimation = (ingredientPositions) => {
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
      apfelessig: { transform: 'translate(30vw, 30vh) rotate(30deg)', opacity: '1' },
      honig: { transform: 'translate(10vw, 25vh) rotate(15deg)', opacity: '1' },
      ingwer: { transform: 'translate(-42vw, 38vh) rotate(-10deg)', opacity: '1' },
      zitrone: { transform: 'translate(-23vw, 30vh) rotate(-5deg)', opacity: '1' },
      minze: { transform: 'translate(-12vw, 35vh) rotate(-5deg)', opacity: '1' }
    };

    // Set initial states for all ingredients
    Object.entries(ingredients).forEach(([type, element]) => {
      if (element) {
        Object.entries(ingredientPositions[type].initial).forEach(([prop, value]) => {
          element.style[prop] = value;
        });
      }
    });

    // Flag to track if initial animation has played
    let initialAnimationPlayed = false;
    // Get all ingredients
    const ingredientElements = Object.values(ingredients).filter(Boolean);
    // Function to animate ingredients to their final positions
    const animateIngredients = () => {
      // Don't re-animate if already animated and not faded out
      if (initialAnimationPlayed && ingredientElements[0] && ingredientElements[0].style.opacity === '1') {
        return;
      }
      
      Object.entries(ingredients).forEach(([type, element], index) => {
        if (element) {
          setTimeout(() => {
            // Choose the appropriate final positions based on device
            const finalPosition = isMobile ? mobilePositions[type] : ingredientPositions[type].animated;
            
            // Apply the animation
            Object.entries(finalPosition).forEach(([prop, value]) => {
              element.style[prop] = value;
            });
            
            // Store the animated transform for scroll handling
            if (finalPosition.transform) {
              element.dataset.animatedTransform = finalPosition.transform;
            }
          }, 100 + (index * 150)); // Reduced delay for faster animation
        }
      });
      initialAnimationPlayed = true;
    };

    // Check if we're in the header section before triggering animation
    const snapContainer = document.querySelector('.snap-container');
    const isInHeaderSection = snapContainer ? 
      snapContainer.scrollTop < window.innerHeight * 0.5 : 
      true; // Default to true if snapContainer not found (likely on header)
    
    if (isInHeaderSection) {
      // Only run the initial animation if we're actually on the header section
      const ingredientsDelay = 1800;
      setTimeout(animateIngredients, ingredientsDelay);
    } else {
      // If not in header section, hide all ingredients
      ingredientElements.forEach(ingredient => {
        if (ingredient) {
          ingredient.style.opacity = '0';
        }
      });
    }
    
    // Setup scroll handler
    const handleScroll = () => {
      if (!snapContainer) return;
      
      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Check if we're in header section
      const isInHeaderSection = scrollY < viewportHeight * 0.5;
      

      
      if (isInHeaderSection) {
        // If we scrolled back to header section, show ingredients with proper positions
        // Only animate if ingredients are not already visible or we haven't done the initial animation
        if (!initialAnimationPlayed || 
            (ingredientElements[0] && parseFloat(ingredientElements[0].style.opacity) < 0.5)) {
          animateIngredients();
        }
      } else if (scrollY > viewportHeight * 0.05) {
        // We're scrolling away from header, fade out ingredients
        // Calculate fade out based on scroll position
        const opacity = Math.max(0, 1 - (scrollY - viewportHeight * 0.05) / (viewportHeight * 0.1));
        
        ingredientElements.forEach((ingredient) => {
          if (!ingredient) return;
          
          // Adjust opacity based on scroll
          ingredient.style.opacity = opacity.toString();
          
          // Extract position values from dataset
          const animatedTransform = ingredient.dataset.animatedTransform || 'translate(0, 0)';
          const translateMatch = animatedTransform.match(/translate\(([^,]+), ([^)]+)\)/);
          const rotateMatch = animatedTransform.match(/rotate\(([^)]+)\)/);

          let animatedX = translateMatch ? translateMatch[1] : '0px';
          let animatedY = translateMatch ? translateMatch[2] : '0px';
          let rotation = rotateMatch ? rotateMatch[1] : '0deg';
          
          // Move ingredient back toward center as it fades out
          const progress = 1 - opacity;
          
          ingredient.style.transform = `translate(${animatedX}, ${animatedY}) 
                                       translate(${-progress * 5}vw, ${-progress * 5}vh) 
                                       rotate(${rotation})`;
          
          // Store state to remember ingredients have been animated
          if (opacity < 0.1) {
            ingredient.dataset.faded = 'true';
          }
        });
      }
    };
    
    // Add scroll listener
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
      
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ingredientPositions]);
};

export default useIngredientsAnimation;