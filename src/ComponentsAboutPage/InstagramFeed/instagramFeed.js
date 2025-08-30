import React, { useEffect } from 'react';
import './instagramFeed.css';

const InstagramFeed = () => {
  useEffect(() => {
    // Juicer Script laden
    const script = document.createElement('script');
    script.src = 'https://www.juicer.io/embed/songokubloede/embed-code.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup wenn Komponente unmounted wird
      const existingScript = document.querySelector('script[src="https://assets.juicer.io/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="instagram-background-wrapper">
      <div className="instagram-feed-container">
        {/* Instagram Feed Container */}
        <h2>Unser Instagram Feed – Einblicke & Impressionen</h2>
        {/* Hier fügst du deinen Juicer Embed-Code ein */}
        <ul className="juicer-feed" data-feed-id="songokubloede"></ul>
      </div>
    </div>
  );
};

export default InstagramFeed;