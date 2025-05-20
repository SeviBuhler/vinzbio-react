import { useEffect } from 'react';

// Simple debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useBottleScroll = () => {
  useEffect(() => {
    // Add a delay to ensure DOM is fully loaded
    setTimeout(() => {
      const bottle = document.querySelector('.animated-bottle');
      const bottleContainer = document.querySelector('.bottle-container');

      if (!bottleContainer) {
        console.error('Bottle container not found!');
        return;
      }
      
      if (!bottle) {
        console.error('Bottle element not found!');
        return;
      }
      
      const snapContainer = document.querySelector('.snap-container');
      
      if (!snapContainer) {
        console.error('Snap container not found!');
        return;
      }

      // Define animations for each section
      const sectionAnimations = {
        header: {
          transform: (scrollY, viewportHeight, progress) => {
            // Header section: bottle stays centered with slight movement
            const rotation = scrollY * 0.05;
            const horizontalShift = Math.sin(scrollY * 0.01) * 20;
            return `translate(-50%, -50%) translateX(${horizontalShift}px) rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 1;
          },
          opacity: 1,
          zIndex: 20
        },
        
        vinzOriginal: {
          transform: (scrollY, viewportHeight, progress) => {
            // VinzOriginal section: bottle moves to the right side and emerges more from behind the waves
            const baseTransform = `translate(190%, -60%)`;
            const rotation = 5 + Math.sin(progress * Math.PI) * 10;
            const zTranslate = 20 + progress * 30; 
            return `${baseTransform} rotate(${rotation}deg) translateZ(${zTranslate}px)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7; 
          },
          opacity: 1,
          zIndex: 0
        },
        
        vinzLocation: {
          transform: (scrollY, viewportHeight, progress) => {
            // Location section: bottle moves to the left with different angle
            const baseTransform = `translate(190%, -60%)`;
            const rotation = -5 + Math.sin(progress * Math.PI * 2) * 10;
            const zTranslate = 20 + progress * 30; 
            return `${baseTransform} rotate(${rotation}deg) translateZ(${zTranslate}px)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7;
          },
          opacity: 1,
          zIndex: 0 
        },

        vinzFeelings: {
          transform: (scrollY, viewportHeigth, progress) => {
            const baseTransform = `translate(200%, -45%)`;
            const rotation = 5 + Math.sin(progress * Math.PI * 2) * 10;
            return `${baseTransform} rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7;
          },
          opacity: 1,
          zIndex: 10
        },

        vinzShop: {
          transform: (scrollY, viewportHeight, progress) => {
            // Shop section: bottle moves to the right side
            const baseTransform = `translate(230%, -55%)`;
            const rotation = -5 + Math.sin(progress * Math.PI * 2) * 10;
            return `${baseTransform} rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.6;
          },
          opacity: 1,
          zIndex: 10
        },

        mixologie: {
          transform: (scrollY, viewportHeight, progress) => {
            // Mixologie section: bottle moves to the right side
            const baseTransform = `translate(-380%, -80%)`;
            const rotation = 45 + Math.sin(progress * Math.PI * 2) * 10;
            return `${baseTransform} rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.5;
          },
          opacity: 1
        }
      };
      
      let lastScrollY = 0; // Initialize lastScrollY
      
      const handleScroll = () => {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
          const scrollY = snapContainer.scrollTop;
          const viewportHeight = window.innerHeight;
          
          // Memoize calculations that don't change frequently
          if (scrollY === lastScrollY) return;
          lastScrollY = scrollY;
          
          // Determine which section is currently visible
          let currentSection;
          let progress = 0;
          
          if (scrollY < viewportHeight * 0.5) {
            currentSection = 'header';
            progress = scrollY / (viewportHeight * 0.5);
          } else if (scrollY < viewportHeight * 1.5) {
            currentSection = 'vinzOriginal';
            progress = (scrollY - viewportHeight * 0.5) / viewportHeight;
          } else if (scrollY < viewportHeight * 2.5){
            currentSection = 'vinzLocation';
            progress = (scrollY - viewportHeight * 1.5) / viewportHeight;
          } else if (scrollY < viewportHeight * 3.5) {
            currentSection = 'vinzFeelings';
            progress = (scrollY - viewportHeight * 2.5) / viewportHeight;
          } else if (scrollY < viewportHeight * 4.5) {
            currentSection = 'vinzShop';
            progress = (scrollY - viewportHeight * 3.5) / viewportHeight;
          } else {
            currentSection = 'mixologie';
            progress = (scrollY - viewportHeight * 4.5) / viewportHeight;
          }
          
          // Get the animation for the current section
          const animation = sectionAnimations[currentSection];
          
          // During transitions, blend between sections for smoother effect
          let transform, scale, opacity;
          
          if (progress > 0.8 && progress < 1.0) {
            // Determine next section based on current section
            let nextSection;
            switch(currentSection) {
                case 'header': nextSection = 'vinzOriginal'; break;
                case 'vinzOriginal': nextSection = 'vinzLocation'; break;
                case 'vinzLocation': nextSection = 'vinzFeelings'; break;
                case 'vinzFeelings': nextSection = 'vinzShop'; break;
                case 'vinzShop': nextSection = 'mixologie'; break;
                default: nextSection = currentSection;
            }
            
            const nextAnimation = sectionAnimations[nextSection];
            
            // Calculate blend factor (0 to 1)
            const blend = (progress - 0.8) * 5;
            
            // Blend transform (just use next section's transform for simplicity)
            transform = nextAnimation.transform(scrollY, viewportHeight, 0);
            
            // Blend scale
            const currentScale = animation.scale(scrollY, viewportHeight);
            const nextScale = nextAnimation.scale(scrollY, viewportHeight);
            scale = currentScale * (1 - blend) + nextScale * blend;
            
            // Blend opacity
            opacity = animation.opacity * (1 - blend) + nextAnimation.opacity * blend;

            // Blend z-index (transitioning between integer z-index values)
            const currentZIndex = animation.zIndex || 0;
            const nextZIndex = nextAnimation.zIndex || 0;

            // For z-index, we'll need to round to get integer values
            const zIndex = Math.round(currentZIndex * (1 - blend) + nextZIndex * blend);
            bottleContainer.style.zIndex = zIndex;
          } else {
            // Within a section
            transform = animation.transform(scrollY, viewportHeight, progress);
            scale = animation.scale(scrollY, viewportHeight);
            opacity = animation.opacity;
            bottleContainer.style.zIndex = animation.zIndex || 0;
          }
          
          // Apply the transform and scale
          bottle.style.cssText = `
            transform: ${transform} scale(${scale});
            opacity: ${opacity};
          `;
          bottleContainer.setAttribute('style', `z-index: ${animation.zIndex || 0} !important`);

        });
      };
      
      // Make sure the scroll handler runs once at start
      handleScroll();
      
      // Add event listener to snapContainer
      const debouncedHandleScroll = debounce(handleScroll, 10);
      snapContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true });
      
      // Cleanup
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }, 500); 
  }, []);
};

export default useBottleScroll;