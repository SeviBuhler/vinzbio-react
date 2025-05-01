import { useEffect } from 'react';

const useScrollNavigation = () => {
  useEffect(() => {
    const handleNavClick = (e) => {
      const navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    };

    handleNavClick();
    
    return () => {
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);
};

export default useScrollNavigation;