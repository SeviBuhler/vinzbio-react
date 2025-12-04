import { useEffect } from 'react';

const useScrollNavigation = () => {
  useEffect(() => {
    const navLinks = document.querySelectorAll('nav a');
    
    const handleNavClick = (e) => {
      const link = e.currentTarget;
      const targetId = link.getAttribute('href');
      
      // Only handle hash links (anchor links on same page)
      if (!targetId || !targetId.startsWith('#')) {
        return; // Let React Router or browser handle the navigation
      }
      
      e.preventDefault();
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Attach event listeners
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
    
    // Cleanup function
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);
};

export default useScrollNavigation;