import React from 'react';
import './ScrollContainerStyles.css';

const ScrollContainer = ({ children, className = '', onScroll }) => {
  return (
    <div 
      className={`scroll-container ${className}`}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;