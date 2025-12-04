import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    vinzOriginal: { x: 240, y: -20, scale: 0.9, rotation: 5 },
    vinzLocation: { x: 350, y: -8, scale: 0.8, rotation: -5 },
    vinzFeelings: { x: 350, y: -0, scale: 1, rotation: 5 },
    vinzShop: { x: 380, y: -50, scale: 0.7, rotation: -25 },
    mixologie: { x: -400, y: -40, scale: 0.7, rotation: 45 }
  },
  desktop: {
    header: { x: 0, y: 0, scale: 1, rotation: 0 },
    vinzOriginal: { x: 260, y: -20, scale: 0.6, rotation: 5 },
    vinzLocation: { x: 250, y: -5, scale: 0.7, rotation: -5 },
    vinzFeelings: { x: 300, y: -5, scale: 0.7, rotation: 5 },
    vinzShop: { x: 350, y: -25, scale: 0.5, rotation: -25 },
    mixologie: { x: -380, y: -40, scale: 0.5, rotation: 45 }
  },
  largeLaptop: {
    header: { x: 0, y: 0, scale: 1, rotation: 0 },
    vinzOriginal: { x: 250, y: -20, scale: 0.7, rotation: 5 },
    vinzLocation: { x: 250, y: -15, scale: 0.9, rotation: -5 },
    vinzFeelings: { x: 350, y: -5, scale: 0.9, rotation: 5 },
    vinzShop: { x: 370, y: -30, scale: 0.7, rotation: -15 },
    mixologie: { x: -350, y: -30, scale: 0.6, rotation: 45 }
  },
  laptop: {
    header: { x: 0, y: 0, scale: 1, rotation: 0 },
    vinzOriginal: { x: 300, y: -20, scale: 0.8, rotation: 5 },
    vinzLocation: { x: 280, y: -5, scale: 0.8, rotation: -5 },
    vinzFeelings: { x: 350, y: -0, scale: 0.8, rotation: 5 },
    vinzShop: { x: 380, y: -40, scale: 0.6, rotation: -15 },
    mixologie: { x: -320, y: -50, scale: 0.7, rotation: 45 }
  },
  tablet: {
    header: { x: 0, y: 0, scale: 0.8, rotation: 0 },
    vinzOriginal: { x: 950, y: 70, scale: 0.8, rotation: 5 },
    vinzLocation: { x: 120, y: 0, scale: 0.6, rotation: -5 },
    vinzFeelings: { x: 130, y: -35, scale: 0.6, rotation: 5 },
    vinzShop: { x: 150, y: -45, scale: 0.5, rotation: -5 },
    mixologie: { x: -250, y: -30, scale: 0.4, rotation: 45 }
  },
  mobile: {
    header: { x: 0, y: 0, scale: 0.8, rotation: 0 },
    vinzOriginal: { x: 70, y: 10, scale: 0.5, rotation: 10 },
    vinzLocation: { x: -70, y: 25, scale: 0.5, rotation: -10 },
    vinzFeelings: { x: 90, y: 30, scale: 0.5, rotation: 45 },
    vinzShop: { x: 90, y: -40, scale: 0, rotation: -10, opacity: 0 },
    mixologie: { x: -80, y: -75, scale: 0.3, rotation: 30 }
  },
  smallMobile: {
    header: { x: 0, y: 0, scale: 0.8, rotation: 0 },
    vinzOriginal: { x: 65, y: 25, scale: 0.5, rotation: 10 },
    vinzLocation: { x: -70, y: 25, scale: 0.5, rotation: -10 },
    vinzFeelings: { x: 90, y: 30, scale: 0.5, rotation: 30 },
    vinzShop: { x: 90, y: -30, scale: 0, rotation: -10, opacity: 0 },
    mixologie: { x: -80, y: -75, scale: 0.3, rotation: 45, opacity: 0 }
  },
};

const getResponsivePosition = (screenWidth, screenHeight, basePositions) => {
  const smallMobile = screenWidth < 400;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1080;
  const isLaptop = screenWidth >= 1080 && screenWidth < 1440;
  const isLargeLaptop = screenWidth >= 1440 && screenWidth < 1920;
  const isDesktop = screenWidth >= 1920 && screenWidth < 2048;
  
  let positions;
  if (smallMobile) {
    positions = basePositions.smallMobile;
  } else if (isMobile) {
    positions = basePositions.mobile;
  } else if (isTablet) {
    positions = basePositions.tablet;
  } else if (isLaptop) {
    positions = basePositions.laptop;
  } else if (isLargeLaptop) {
    positions = basePositions.largeLaptop;
  } else if (isDesktop) {
    positions = basePositions.desktop;
  } else {
    positions = basePositions.largeDesktop;
  }
  
  // ✅ Verwende Werte DIREKT - keine Multiplikation
  return positions;
};

const useBottleScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === '/home' || location.pathname === '/';

    if (!isHomePage) {
      return;
    }

    const bottle = document.querySelector('.animated-bottle');
    const bottleContainer = document.querySelector('.bottle-container');
    
    if (!bottleContainer || !bottle) {
      console.log('❌ Bottle elements not found');
      return;
    }
    
    const snapContainer = document.querySelector('.snap-container');
    
    if (!snapContainer) {
      return;
    }

    // ✅ Funktion die immer aktuelle positions holt
    const getPositions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      return getResponsivePosition(screenWidth, screenHeight, basePositions);
    };

    // ✅ INITIAL FLY-IN ANIMATION
    const initialPositions = getPositions();
    const pos = initialPositions.header;
    console.log('🚀 Starting bottle fly-in with scale:', pos.scale, 'screenWidth:', window.innerWidth);
    
    // Setze Startposition (oben außerhalb)
    bottleContainer.style.transform = 'translate(-50%, -250vh)';
    bottleContainer.style.opacity = '0';
    bottleContainer.style.transition = 'none';
    
    bottle.style.transform = `translate(${pos.x}%, ${pos.y}%) rotate(${pos.rotation}deg) scale(${pos.scale})`;
    bottle.style.transition = 'none';
    bottle.style.opacity = '1';
    
    // Force reflow
    void bottleContainer.offsetHeight;
    
    // Fly in nach 300ms
    setTimeout(() => {
      console.log('🎯 Bottle flying in now');
      bottleContainer.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
      bottleContainer.style.transform = 'translate(-50%, -50%)';
      bottleContainer.style.opacity = '1';
      
      // Nach fly-in: smooth transitions für scroll
      setTimeout(() => {
        bottle.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      }, 1200);
    }, 300);

    // ✅ Define animations als Funktion die aktuelle positions verwendet
    const getSectionAnimations = (responsivePositions) => ({
      header: {
        transform: (scrollY, viewportHeight, progress) => {
          const pos = responsivePositions.header;
          const rotation = scrollY * 0.05 + pos.rotation;
          const horizontalShift = Math.sin(scrollY * 0.01) * 20;
          return `translate(${pos.x + horizontalShift}%, ${pos.y}%) rotate(${rotation}deg)`;
        },
        scale: () => responsivePositions.header.scale,
        opacity: responsivePositions.header.opacity || 1,
        zIndex: 20
      },
      
      vinzOriginal: {
        transform: (scrollY, viewportHeight, progress) => {
          const p = responsivePositions.vinzOriginal;
          const rotation = p.rotation + Math.sin(progress * Math.PI) * 10;
          const zTranslate = 20 + progress * 30;
          return `translate(${p.x}%, ${p.y}%) rotate(${rotation}deg) translateZ(${zTranslate}px)`;
        },
        scale: () => responsivePositions.vinzOriginal.scale,
        opacity: responsivePositions.vinzOriginal.opacity || 1,
        zIndex: 6
      },
      
      vinzLocation: {
        transform: (scrollY, viewportHeight, progress) => {
          const p = responsivePositions.vinzLocation;
          const rotation = p.rotation + Math.sin(progress * Math.PI * 2) * 10;
          const zTranslate = 20 + progress * 30;
          return `translate(${p.x}%, ${p.y}%) rotate(${rotation}deg) translateZ(${zTranslate}px)`;
        },
        scale: () => responsivePositions.vinzLocation.scale,
        opacity: responsivePositions.vinzLocation.opacity || 1,
        zIndex: 0
      },

      vinzFeelings: {
        transform: (scrollY, viewportHeight, progress) => {
          const p = responsivePositions.vinzFeelings;
          const rotation = p.rotation + Math.sin(progress * Math.PI * 2) * 10;
          return `translate(${p.x}%, ${p.y}%) rotate(${rotation}deg)`;
        },
        scale: () => responsivePositions.vinzFeelings.scale,
        opacity: responsivePositions.vinzFeelings.opacity || 1,
        zIndex: 10
      },

      vinzShop: {
        transform: (scrollY, viewportHeight, progress) => {
          const p = responsivePositions.vinzShop;
          const rotation = p.rotation + Math.sin(progress * Math.PI * 2) * 10;
          return `translate(${p.x}%, ${p.y}%) rotate(${rotation}deg)`;
        },
        scale: () => responsivePositions.vinzShop.scale,
        opacity: responsivePositions.vinzShop.opacity || 1,
        zIndex: 10
      },

      mixologie: {
        transform: (scrollY, viewportHeight, progress) => {
          const p = responsivePositions.mixologie;
          const rotation = p.rotation + Math.sin(progress * Math.PI * 2) * 10;
          return `translate(${p.x}%, ${p.y}%) rotate(${rotation}deg)`;
        },
        scale: () => responsivePositions.mixologie.scale,
        opacity: responsivePositions.mixologie.opacity || 1,
        zIndex: 11
      }
    });

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
    
    let lastScrollY = 0;
    
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = snapContainer.scrollTop;
        const viewportHeight = window.innerHeight;
        
        if (scrollY === lastScrollY) return;
        lastScrollY = scrollY;
        
        // ✅ Hole AKTUELLE positions
        const currentPositions = getPositions();
        const sectionAnimations = getSectionAnimations(currentPositions);
        
        const { name: currentSection, progress } = getCurrentSection(scrollY, viewportHeight);
        const animation = sectionAnimations[currentSection];
        
        let transform, scale, opacity;
        
        if (progress > 0.8 && progress < 1.0) {
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
          const blend = (progress - 0.8) * 5;
          
          transform = nextAnimation.transform(scrollY, viewportHeight, 0);
          
          const currentScale = animation.scale(scrollY, viewportHeight);
          const nextScale = nextAnimation.scale(scrollY, viewportHeight);
          scale = currentScale * (1 - blend) + nextScale * blend;
          
          opacity = animation.opacity * (1 - blend) + nextAnimation.opacity * blend;

          const currentZIndex = animation.zIndex || 0;
          const nextZIndex = nextAnimation.zIndex || 0;
          const zIndex = Math.round(currentZIndex * (1 - blend) + nextZIndex * blend);
          bottleContainer.style.zIndex = zIndex;
        } else {
          transform = animation.transform(scrollY, viewportHeight, progress);
          scale = animation.scale(scrollY, viewportHeight);
          opacity = animation.opacity;
          bottleContainer.style.zIndex = animation.zIndex || 0;
        }
        
        bottle.style.transform = `${transform} scale(${scale})`;
        bottle.style.opacity = opacity;
      });
    };
    
    const debouncedHandleScroll = debounce(handleScroll, 5);
    snapContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    const updateResponsivePositions = () => {
      console.log('📐 Window resized, updating positions');
      handleScroll(); // ✅ handleScroll holt sich selbst die neuen positions
    };

    const debouncedResize = debounce(updateResponsivePositions, 150);
    window.addEventListener('resize', debouncedResize);

    return () => {
      snapContainer.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [location.pathname]);
};

export default useBottleScroll;