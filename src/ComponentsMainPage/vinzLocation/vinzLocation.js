import React from 'react';
import './vinzLocationStyles.css';
import VinzMap from './VinzMap';

const VinzLocation = ({ id }) => {
  return (
    <section id={id} className="section">
      <div className="vinzlocation-content">
        <div className="vinzlocation-wrapper">
          {/* Map on the left side */}
          <div className="vinzlocation-map">
            <VinzMap />
          </div>
          {/* Text content on the right side */}
          <div className="vinzlocation-text">
          <h2 className="vinzlocation-title">
            <span className="blue-text">Wo git's</span> <span className="black-text">vinz.</span>
          </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VinzLocation;