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
            return `translateX(${horizontalShift}px) rotate(${rotation}deg)`;
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
            const baseTransform = `translate(100%, -0%)`;
            const rotation = 5 + Math.sin(progress * Math.PI) * 10;
            const zTranslate = 20 + progress * 30; 
            return `${baseTransform} rotate(${rotation}deg) translateZ(${zTranslate}px)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7; 
          },
          opacity: 1,
          zIndex: 6
        },
        
        vinzLocation: {
          transform: (scrollY, viewportHeight, progress) => {
            // Location section: bottle moves to the left with different angle
            const baseTransform = `translate(190%, -0%)`;
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

      const checkInitialSection = () => {
        const scrollY = snapContainer.scrollTop;
        const viewportHeight = window.innerHeight;
        
        // Check if we're in header section (first section)
        const isInHeaderSection = scrollY < viewportHeight * 0.5;
        
        if (isInHeaderSection) {
          // We're in header section, do the slide-in animation
          const initialHeaderTransform = sectionAnimations.header.transform(0, window.innerHeight, 0);
          const initialHeaderScale = sectionAnimations.header.scale(0, window.innerHeight);


          bottleContainer.style.cssText = `
            z-index: ${sectionAnimations.header.zIndex || 0};
          `;
          
          // Force a reflow to ensure the initial position is applied before animating
          void bottle.offsetHeight;
          
          // Then animate it in after a short delay
          setTimeout(() => {
            bottle.style.cssText = `
              transform: ${initialHeaderTransform} scale(${initialHeaderScale});
              opacity: ${sectionAnimations.header.opacity};
              transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease;
            `;
          }, 50);
        } else {
          // We're not in header section, immediately apply the correct section's animation
          const currentSection = getCurrentSection(scrollY, viewportHeight);
          const animation = sectionAnimations[currentSection.name];
          const progress = currentSection.progress;
          
          const transform = animation.transform(scrollY, viewportHeight, progress);
          const scale = animation.scale(scrollY, viewportHeight);
          
          bottle.style.cssText = `
            transform: ${transform} scale(${scale});
            opacity: ${animation.opacity};
          `;
          
          bottleContainer.style.cssText = `
            z-index: ${animation.zIndex || 0};
            transform: translate(-50%, -50%);
          `;
        }
      };

      // Helper function to determine current section
      const getCurrentSection = (scrollY, viewportHeight) => {
        if (scrollY < viewportHeight * 0.5) {
          return { name: 'header', progress: scrollY / (viewportHeight * 0.5) };
        } else if (scrollY < viewportHeight * 1.5) {
          return { name: 'vinzOriginal', progress: (scrollY - viewportHeight * 0.5) / viewportHeight };
        } else if (scrollY < viewportHeight * 2.5) {
          return { name: 'vinzLocation', progress: (scrollY - viewportHeight * 1.5) / viewportHeight };
        } else if (scrollY < viewportHeight * 3.5) {
          return { name: 'vinzFeelings', progress: (scrollY - viewportHeight * 2.5) / viewportHeight };
        } else if (scrollY < viewportHeight * 4.5) {
          return { name: 'vinzShop', progress: (scrollY - viewportHeight * 3.5) / viewportHeight };
        } else {
          return { name: 'mixologie', progress: (scrollY - viewportHeight * 4.5) / viewportHeight };
        }
      };

      // Replace your current initial animation code with this function call
      checkInitialSection();
      
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
          
          // Apply the transform and scale to the bottle
          bottle.style.transform = `${transform} scale(${scale})`;
          bottle.style.opacity = opacity;
          bottle.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease";

          // Only update z-index on the container (not the transform which stays stable)
          bottleContainer.style.zIndex = animation.zIndex || 0;

        });
      };
      
      // Make sure the scroll handler runs once at start
      handleScroll();
      
      // Add event listener to snapContainer
      const debouncedHandleScroll = debounce(handleScroll, 5);
      snapContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true });
      
      // Cleanup
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }, 500); 
  }, []);
};

export default useBottleScroll;
