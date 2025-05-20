import { useEffect } from 'react';

const useBottleScroll = () => {
  useEffect(() => {
    // Add a delay to ensure DOM is fully loaded
    setTimeout(() => {
      const bottle = document.querySelector('.animated-bottle');
      
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
          opacity: 1
        },
        
        vinzOriginal: {
          transform: (scrollY, viewportHeight, progress) => {
            // VinzOriginal section: bottle moves to the right side
            const baseTransform = `translate(50%, -50%)`;
            const rotation = 5 + Math.sin(progress * Math.PI) * 10; 
            return `${baseTransform} rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7; 
          },
          opacity: 1
        },
        
        vinzLocation: {
          transform: (scrollY, viewportHeight, progress) => {
            // Location section: bottle moves to the left with different angle
            const baseTransform = `translate(100%, -40%)`;
            const rotation = -5 + Math.sin(progress * Math.PI * 2) * 10;
            return `${baseTransform} rotate(${rotation}deg)`;
          },
          scale: (scrollY, viewportHeight) => {
            return 0.7;
          },
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
          opacity: 1
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
      
      const handleScroll = () => {
        const scrollY = snapContainer.scrollTop;
        const viewportHeight = window.innerHeight;
        
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
        
        if (progress > 0.8 && progress < 1.0 && currentSection !== 'vinzLocation') {
          // Transitioning to next section
          const nextSection = currentSection === 'header' ? 'vinzOriginal' : 'vinzLocation';
          const nextAnimation = sectionAnimations[nextSection];
          
          // Calculate blend factor (0 to 1)
          const blend = (progress - 0.8) * 5; // Map 0.8-1.0 to 0-1
          
          // Blend transform (just use next section's transform for simplicity)
          transform = nextAnimation.transform(scrollY, viewportHeight, 0);
          
          // Blend scale
          const currentScale = animation.scale(scrollY, viewportHeight);
          const nextScale = nextAnimation.scale(scrollY, viewportHeight);
          scale = currentScale * (1 - blend) + nextScale * blend;
          
          // Blend opacity
          opacity = animation.opacity * (1 - blend) + nextAnimation.opacity * blend;
        } else {
          // Within a section
          transform = animation.transform(scrollY, viewportHeight, progress);
          scale = animation.scale(scrollY, viewportHeight);
          opacity = animation.opacity;
        }
        
        // Apply the transform and scale
        bottle.style.transform = `${transform} scale(${scale})`;
        bottle.style.opacity = opacity;
      };
      
      // Make sure the scroll handler runs once at start
      handleScroll();
      
      // Add event listener to snapContainer
      snapContainer.addEventListener('scroll', handleScroll);
      
      // Cleanup
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }, 500); // Reduced delay to 500ms for faster initialization
  }, []);
};

export default useBottleScroll;