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

// Base positions for each device category and section
const basePositions = {
  largeDesktop: {
    header: { x: 0, y: 0, scale: 1, rotation: 0 },
    vinzOriginal: { x: 240, y: -20, scale: 0.7, rotation: 5 },
    vinzLocation: { x: 280, y: -8, scale: 0.8, rotation: -5 },
    vinzFeelings: { x: 280, y: -0, scale: 0.8, rotation: 5 },
    vinzShop: { x: 340, y: -50, scale: 0.7, rotation: -25 },
    mixologie: { x: -350, y: -30, scale: 0.7, rotation: 45 }
  },
  desktop: {
    header: { x: 0, y: 0, scale: 1.2, rotation: 0 },
    vinzOriginal: { x: 260, y: -20, scale: 0.6, rotation: 5 },
    vinzLocation: { x: 250, y: -5, scale: 0.7, rotation: -5 },
    vinzFeelings: { x: 300, y: -5, scale: 0.7, rotation: 5 },
    vinzShop: { x: 350, y: -25, scale: 0.5, rotation: -25 },
    mixologie: { x: -380, y: -40, scale: 0.5, rotation: 45 }
  },
  largeLaptop: {
    header: { x: 0, y: 0, scale: 1.3, rotation: 0 },
    vinzOriginal: { x: 300, y: -20, scale: 0.8, rotation: 5 },
    vinzLocation: { x: 300, y: -5, scale: 0.9, rotation: -5 },
    vinzFeelings: { x: 400, y: -5, scale: 0.9, rotation: 5 },
    vinzShop: { x: 400, y: -50, scale: 0.7, rotation: -15 },
    mixologie: { x: -450, y: -50, scale: 0.6, rotation: 45 }
  },
  laptop: {
    header: { x: 0, y: 0, scale: 1.5, rotation: 0 },
    vinzOriginal: { x: 400, y: -20, scale: 1, rotation: 5 },
    vinzLocation: { x: 300, y: -5, scale: 1, rotation: -5 },
    vinzFeelings: { x: 480, y: -0, scale: 1, rotation: 5 },
    vinzShop: { x: 470, y: -60, scale: 0.6, rotation: 15 },
    mixologie: { x: -520, y: -50, scale: 0.7, rotation: 45 }
  },
  tablet: {
    header: { x: 0, y: 0, scale: 3, rotation: 0 },
    vinzOriginal: { x: 950, y: 70, scale: 2.5, rotation: 5 },
    vinzLocation: { x: 120, y: 0, scale: 0.6, rotation: -5 },
    vinzFeelings: { x: 130, y: -35, scale: 0.6, rotation: 5 },
    vinzShop: { x: 150, y: -45, scale: 0.5, rotation: -5 },
    mixologie: { x: -250, y: -30, scale: 0.4, rotation: 45 }
  },
  mobile: {
    header: { x: 0, y: 0, scale: 4, rotation: 0 },
    vinzOriginal: { x: 430, y: 10, scale: 2.5, rotation: 10 },
    vinzLocation: { x: -390, y: 30, scale: 2, rotation: -10 },
    vinzFeelings: { x: 400, y: 50, scale: 2, rotation: 45, },
    vinzShop: { x: 120, y: -40, scale: 0, rotation: -10, opacity: 0 },
    mixologie: { x: -400, y: -100, scale: 2, rotation: 30 }
  },
  smallMobile: {
    header: { x: 0, y: 0, scale: 4, rotation: 0 },
    vinzOriginal: { x: 550, y: 10, scale: 3, rotation: 10 },
    vinzLocation: { x: -420, y: 45, scale: 2.5, rotation: -10 },
    vinzFeelings: { x: 570, y: 60, scale: 2, rotation: 30 },
    vinzShop: { x: 90, y: -30, scale: 0, rotation: -10, opacity: 0 },
    mixologie: { x: -80, y: -15, scale: 0.3, rotation: 45, opacity: 0 }
  },
};

const getResponsivePosition = (screenWidth, screenHeight, basePositions) => {
  // Calculate scale factors based on screen dimensions
  const widthFactor = screenWidth / 1920; 
  const heightFactor = screenHeight / 1080; 
  
  // Get device type
  const smallMobile = screenWidth < 400;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1080;
  const isLaptop = screenWidth >= 1080 && screenWidth < 1440;
  const isLargeLaptop = screenWidth >= 1440 && screenWidth < 1920;
  const isDesktop = screenWidth >= 1920 && screenWidth < 2048;
  
  // Select appropriate base positions based on device type
  let positions;
  if (smallMobile) {
    positions = basePositions.smallMobile;
    console.log(`Small Mobile Detected: ${screenWidth}x${screenHeight}`);
  } else if (isMobile) {
    positions = basePositions.mobile;
    console.log(`Mobile Detected: ${screenWidth}x${screenHeight}`);
  } else if (isTablet) {
    positions = basePositions.tablet;
    console.log(`Tablet Detected: ${screenWidth}x${screenHeight}`);
  } else if (isLaptop) {
    positions = basePositions.laptop;
    console.log(`Laptop Detected: ${screenWidth}x${screenHeight}`);
  } else if (isLargeLaptop) {
    positions = basePositions.largeLaptop;
    console.log(`Large Laptop Detected: ${screenWidth}x${screenHeight}`);
  } else if (isDesktop) {
    positions = basePositions.desktop;
    console.log(`Desktop Detected: ${screenWidth}x${screenHeight}`);
  }  else {
    positions = basePositions.largeDesktop;
    console.log(`Large Desktop detected: ${screenWidth}x${screenHeight}`);
  }
  
  // Apply scaling factors to make positions fluid within each device category
  const adjustedPositions = {};
  Object.entries(positions).forEach(([key, pos]) => {
    const x = pos.x * widthFactor;
    const y = pos.y * heightFactor;
    const scale = pos.scale * Math.min(widthFactor, heightFactor);
    const rotation = pos.rotation;
    const opacity = pos.opacity !== undefined ? pos.opacity : 1;
    
    
    adjustedPositions[key] = { x, y, scale, rotation, opacity };
  });
  
  return adjustedPositions;
};

const useBottleScroll = () => {
  useEffect(() => {
    const isHomePage = window.location.pathname === '/home';

    if (!isHomePage) {
      console.log('Not on home page, skipping bottle scroll effect.');
      return;
    }

    // Add a delay to ensure DOM is fully loaded
    setTimeout(() => {
      const bottle = document.querySelector('.animated-bottle');
      const bottleContainer = document.querySelector('.bottle-container');
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const responsivePositions = getResponsivePosition(screenWidth, screenHeight, basePositions);

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
            const pos = responsivePositions.header;
            const rotation = scrollY * 0.05 +pos.rotation;
            const horizontalShift = Math.sin(scrollY * 0.01) * 20;
            return `translate(${pos.x + horizontalShift}%, ${pos.y}%) rotate(${rotation}deg)`;
          },
          scale: () => responsivePositions.header.scale,
          opacity: responsivePositions.header.opacity,
          zIndex: 20
        },
        
        vinzOriginal: {
          transform: (scrollY, viewportHeight, progress) => {
            const pos = responsivePositions.vinzOriginal;
            const rotation = pos.rotation + Math.sin(progress * Math.PI) * 10;
            const zTranslate = 20 + progress * 30;
            return `translate(${pos.x}%, ${pos.y}%) rotate(${rotation}deg) translateZ(${zTranslate}px)`;
          },
          scale: () => responsivePositions.vinzOriginal.scale,
          opacity: responsivePositions.vinzOriginal.opacity,
          zIndex: 6
        },
        
        vinzLocation: {
          transform: (scrollY, viewportHeight, progress) => {
            const pos = responsivePositions.vinzLocation;
            const rotation = pos.rotation + Math.sin(progress * Math.PI * 2) * 10;
            const zTranslate = 20 + progress * 30; 
            return `translate(${pos.x}%, ${pos.y}%) rotate(${rotation}deg) translateZ(${zTranslate}px)`;
          },
          scale: () => responsivePositions.vinzLocation.scale,
          opacity: responsivePositions.vinzLocation.opacity,
          zIndex: 0 
        },

        vinzFeelings: {
          transform: (scrollY, viewportHeigth, progress) => {
            const pos = responsivePositions.vinzFeelings;
            const rotation = pos.rotation + Math.sin(progress * Math.PI * 2) * 10;
            return `translate(${pos.x}%, ${pos.y}%) rotate(${rotation}deg)`;
          },
          scale: () => responsivePositions.vinzFeelings.scale,
          opacity: responsivePositions.vinzFeelings.opacity,
          zIndex: 10
        },

        vinzShop: {
          transform: (scrollY, viewportHeight, progress) => {
            const pos = responsivePositions.vinzShop;
            const rotation = pos.rotation + Math.sin(progress * Math.PI * 2) * 10;
            return `translate(${pos.x}%, ${pos.y}%) rotate(${rotation}deg)`;
          },
          scale: () => responsivePositions.vinzShop.scale,
          opacity: responsivePositions.vinzShop.opacity,
          zIndex: 10
        },

        mixologie: {
          transform: (scrollY, viewportHeight, progress) => {
            const pos = responsivePositions.mixologie;
            const rotation = pos.rotation + Math.sin(progress * Math.PI * 2) * 10;
            return `translate(${pos.x}%, ${pos.y}%) rotate(${rotation}deg)`;
          },
          scale: () => responsivePositions.mixologie.scale,
          opacity: responsivePositions.mixologie.opacity,
          zIndex: 11
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
              transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
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
      
      let lastScrollY = 0; 
      
      const handleScroll = () => {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
          const scrollY = snapContainer.scrollTop;
          const viewportHeight = window.innerHeight;
          
          // Memoize calculations that don't change frequently
          if (scrollY === lastScrollY) return;
          lastScrollY = scrollY;
          
          // Determine current section based on scroll position
          const { name: currentSection, progress } = getCurrentSection(scrollY, viewportHeight);
          
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
      
      // Add this after checkInitialSection() is called

      // Handle window resize to update responsive positions
      const updateResponsivePositions = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const newPositions = getResponsivePosition(newWidth, newHeight, basePositions);
        
        // Update each section's positions
        Object.keys(newPositions).forEach(section => {
          responsivePositions[section] = newPositions[section];
        });
        
        // Apply current position immediately
        handleScroll();
      };

      // Add resize listener with debounce
      const debouncedResize = debounce(updateResponsivePositions, 150);
      window.addEventListener('resize', debouncedResize);


      // Cleanup
      return () => {
        snapContainer.removeEventListener('scroll', debouncedHandleScroll);
        window.removeEventListener('resize', debouncedResize);
      };
    }, 500); 
  }, []);
};

export default useBottleScroll;
