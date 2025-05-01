import { useEffect } from 'react';

const useBottleScroll = () => {
  useEffect(() => {
    // Add a delay to ensure DOM is fully loaded
    setTimeout(() => {
      const bottle = document.querySelector('.animated-bottle');
      console.log('Bottle element found:', bottle); // Debug log
      
      if (!bottle) {
        console.error('Bottle element not found!');
        return;
      }
      
      const snapContainer = document.querySelector('.snap-container');
      
      if (!snapContainer) {
        console.error('Snap container not found!');
        return;
      }
      
      const handleScroll = () => {
        const scrollY = snapContainer.scrollTop;
        //console.log('Scrolling, Y position:', scrollY);
        
        const viewportHeight = window.innerHeight;
        
        // More noticeable effects for testing
        const rotation = scrollY * 0.05; // Increased from 0.02
        const horizontalShift = Math.sin(scrollY * 0.01) * 20; // More pronounced movement
        
        // Apply transforms with more dramatic effect for testing
        const transform = `translate(-50%, -50%) translateX(${horizontalShift}px) rotate(${rotation}deg)`;
        //console.log('Setting transform:', transform); // Debug log
        
        bottle.style.transform = transform;
        
        // Scale effect
        if (scrollY > viewportHeight * 0.5) { // Changed from 0.8 to make it more noticeable
          const scale = Math.max(0.7, 1 - (scrollY - viewportHeight * 0.5) / viewportHeight);
          bottle.style.transform += ` scale(${scale})`;
        }
      };
      
      // Make sure the scroll handler runs once at start
      handleScroll();
      
      // Add event listener to snapContainer instead of window
      snapContainer.addEventListener('scroll', handleScroll);
      
      // Cleanup
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }, 1000); // 1 second delay to ensure DOM is ready
  }, []);
};

export default useBottleScroll;