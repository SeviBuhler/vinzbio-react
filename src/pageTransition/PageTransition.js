import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransitionStyles.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`page-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;