import React, { memo } from 'react';
import './vinzLocationStyles.css';
import Map from '../../components/common/Map/Map';
import { LOCATIONS } from '../../config/locationsConfig';

const VinzLocation = memo(({ id }) => {
  return (
    <section id={id} className="section">
      <div className="vinzlocation-content">
        <div className="vinzlocation-wrapper">
          <div className="vinzlocation-map">
            <Map locations={LOCATIONS} />
          </div>
          
          <div className="vinzlocation-text">
            <h2 className="vinzlocation-title">
              <span className="blue-text">Wo git's</span>{' '}
              <span className="black-text">vinz.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
});

VinzLocation.displayName = 'VinzLocation';

export default VinzLocation;