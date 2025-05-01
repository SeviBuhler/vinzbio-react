import React from 'react';
import './vinzLocationStyles.css';

const VinzLocation = () => {
  return (
    <div className="vinz-location-container">
      <div className="vinz-location-content">
        <h2>Vinz Location</h2>
        <p>Discover our locations and find the nearest Vinz store to you.</p>
        <div className="location-map">
          {/* Map or location details can be added here */}
        </div>
      </div>
    </div>
  );
}

export default VinzLocation;