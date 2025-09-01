import React, { useEffect } from 'react';
import './instagramFeed.css';
import {
  InstagramEmbed
} from 'react-social-media-embed';


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
    <section className="instagram-section">
      <div className="instagram-feed-container">
        {/* Instagram Feed Container */}
        <h2>Unser Instagram Feed – Einblicke & Impressionen</h2>
        <InstagramEmbed
          url="https://www.instagram.com/p/DIWedB1tRmR/"
          captioned
        />
      </div>
    </section>
  );
};

export default InstagramFeed;