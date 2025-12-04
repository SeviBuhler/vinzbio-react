import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import './MapStyles.css';
import { MAP_CONFIG } from '../../../config/locationsConfig';
import { CustomInfoWindow } from './CustomInfoWindow';

const Map = memo(({ locations = [], className = '' }) => {
  const mapRef = useRef(null);
  const ctrlKeyRef = useRef(false);
  const mapInstanceRef = useRef(null);
  const activeInfoWindowRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [mapAnimated, setMapAnimated] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
 
 
  // Create custom marker icon
  const createMarkerIcon = useCallback(() => {
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60">
          <path d="M24 0 C37 0 48 11 48 24 C48 38 24 60 24 60 C24 60 0 38 0 24 C0 11 11 0 24 0 Z" fill="${MAP_CONFIG.markerColor}" stroke="#FFFFFF" stroke-width="2"/>
          <circle cx="24" cy="24" r="12" fill="white"/>
          <text x="24" y="29" text-anchor="middle" font-size="18" font-weight="bold" fill="${MAP_CONFIG.markerColor}" font-family="Arial">
            V
          </text>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(36, 45),
      anchor: new window.google.maps.Point(18, 45),
      labelOrigin: new window.google.maps.Point(18, -10)
    };
  }, []);

  // Create content for custom info window
  const createInfoWindowContent = useCallback((location, isMobile) => {
    const hasWebsite = !!location.website;
    const hasGoogleMaps = !!location.googleMaps;
    const hasDescription = !!location.description;
    
    return `
      <div class="custom-info-inner ${isMobile ? 'mobile' : 'desktop'}">
        <!-- Header (Orange) -->
        <div class="custom-info-header">
          <h3>${location.name}</h3>
        </div>
        
        <!-- Content (White) -->
        <div class="custom-info-body">
          <!-- Adresse -->
          <div class="custom-info-address">
            <span class="info-icon">📍</span>
            <p>${location.address}</p>
          </div>
          
          ${hasDescription ? `
            <!-- Beschreibung -->
            <p class="custom-info-description">${location.description}</p>
          ` : ''}
          
          ${(hasWebsite || hasGoogleMaps) ? `
            <!-- Buttons -->
            <div class="custom-info-buttons ${!hasWebsite || !hasGoogleMaps ? 'single' : ''}">
              ${hasWebsite ? `
                <a href="${location.website}" 
                   target="_blank" 
                   rel="noreferrer noopener"
                   class="custom-info-btn btn-website">
                  <span class="btn-icon">🌐</span>
                  <span>Website</span>
                </a>
              ` : ''}
              ${hasGoogleMaps ? `
                <a href="${location.googleMaps}" 
                   target="_blank" 
                   rel="noreferrer noopener"
                   class="custom-info-btn btn-route">
                  <span class="btn-icon">🗺️</span>
                  <span>Route</span>
                </a>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }, []);

  // Prevent pinch zoom on mobile
  const preventZoom = useCallback((e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, []);

  // Handle wheel events for map zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const map = mapInstanceRef.current;
    if (!ctrlKeyRef.current || !map) return false;
    
    try {
      const delta = e.deltaY < 0 ? 1 : -1;
      const zoom = map.getZoom();
      const rect = mapRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const bounds = map.getBounds();
      const projection = map.getProjection();
      
      if (!bounds || !projection) {
        map.setZoom(zoom + delta);
        return false;
      }
      
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const targetLat = ne.lat() - (mouseY / mapRef.current.offsetHeight) * (ne.lat() - sw.lat());
      const targetLng = sw.lng() + (mouseX / mapRef.current.offsetWidth) * (ne.lng() - sw.lng());
      const targetPoint = new window.google.maps.LatLng(targetLat, targetLng);
      const currentCenter = map.getCenter();
      const latDistance = targetPoint.lat() - currentCenter.lat();
      const lngDistance = targetPoint.lng() - currentCenter.lng();
      
      map.setZoom(zoom + delta);
      
      const panFactor = delta > 0 ? 0.5 : -0.15;
      map.panTo({
        lat: currentCenter.lat() + (latDistance * panFactor),
        lng: currentCenter.lng() + (lngDistance * panFactor)
      });
    } catch (error) {
      console.error('Error in wheel zoom:', error);
    }
    
    return false;
  }, []);

  // Initialize map
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google || locations.length === 0) return;

    try {
      const isMobile = window.innerWidth <= 768;
      
      const mapOptions = {
        center: MAP_CONFIG.defaultCenter,
        zoom: isMobile ? MAP_CONFIG.defaultZoom.mobile : MAP_CONFIG.defaultZoom.desktop,
        mapTypeControl: !isMobile,
        mapTypeId: 'terrain',
        streetViewControl: false,
        zoomControl: true,
        fullscreenControl: !isMobile,
        gestureHandling: isMobile ? 'greedy' : 'cooperative',
        draggable: true,
        scrollwheel: false,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        zoomControlOptions: {
          position: window.google?.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: MAP_CONFIG.styles
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      const bounds = new window.google.maps.LatLngBounds();
      const markerIcon = createMarkerIcon();

      locations.forEach(location => {
        bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));

        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: markerIcon,
          animation: window.google.maps.Animation.DROP
        });

        // Custom InfoWindow erstellen - NEU
        const infoWindow = new CustomInfoWindow(
          new window.google.maps.LatLng(location.lat, location.lng),
          createInfoWindowContent(location, isMobile),
          map
        );

        marker.addListener('click', () => {
          // Schließe vorheriges InfoWindow
          if (activeInfoWindowRef.current && activeInfoWindowRef.current !== infoWindow) {
            activeInfoWindowRef.current.hide();
          }

          const isMobile = window.innerWidth <= 768;

          // Berechne Offset basierend auf InfoWindow-Höhe
          const mapHeight = map.getDiv().offsetHeight;

          // Berechne wie weit nach oben der Marker verschoben werden soll
          // Damit das InfoWindow gut sichtbar ist (ca. 1/3 vom oberen Rand)
          const targetPosition = mapHeight * 0.35; // 35% von oben
          const markerPixelPosition = mapHeight * 0.5; // Marker ist aktuell in der Mitte
          const shiftNeeded = markerPixelPosition - targetPosition;

          // Konvertiere Pixel-Shift zu Lat-Offset
          const scale = Math.pow(2, map.getZoom());
          const pixelOffset = shiftNeeded / scale;

          // Berechne neue Center-Position
          const newLat = location.lat - (pixelOffset * 0.0000015); // Angepasster Faktor

          // Pan zur neuen Position
          map.panTo({
            lat: newLat,
            lng: location.lng
          });

          // Automatisches Zoom nur bei kleinen Zoom-Leveln
          if (isMobile && map.getZoom() < 11) {
            map.setZoom(13);
          }

          // Öffne InfoWindow nach Animation
          setTimeout(() => {
            infoWindow.show();
            activeInfoWindowRef.current = infoWindow;
          }, isMobile ? 150 : 250);
        });

        marker.addListener('mouseover', () => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => marker.setAnimation(null), 700);
        });
      });

      const padding = isMobile ? { top: 20, right: 20, bottom: 20, left: 20 } : 50;
      map.fitBounds(bounds, padding);
      
      // Close InfoWindow beim Klick auf die Map - NEU
      map.addListener('click', () => {
        if (activeInfoWindowRef.current) {
          activeInfoWindowRef.current.hide();
          activeInfoWindowRef.current = null;
        }
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error loading map. Please try again.');
    }
  }, [locations, createMarkerIcon, createInfoWindowContent]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setMapAnimated(true), 300);
      } else {
        setIsVisible(false);
        setMapAnimated(false);
      }
    }, { threshold: 0.3 });

    const mapContainer = document.querySelector('.map-section');
    if (mapContainer) {
      observer.observe(mapContainer);
    }

    return () => {
      if (mapContainer) {
        observer.unobserve(mapContainer);
      }
    };
  }, []);

  // Handle Ctrl key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Control') {
        ctrlKeyRef.current = true;
        setIsCtrlPressed(true);
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'Control') {
        ctrlKeyRef.current = false;
        setIsCtrlPressed(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Close info window on map click
  useEffect(() => {
    if (mapInstanceRef.current) {
      const mapClickListener = mapInstanceRef.current.addListener('click', () => {
        if (activeInfoWindowRef.current) {
          activeInfoWindowRef.current.close();
          activeInfoWindowRef.current = null;
        }
      });

      return () => {
        if (mapInstanceRef.current && mapClickListener) {
          window.google.maps.event.removeListener(mapClickListener);
        }
      };
    }
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!isVisible) return;
    
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      return;
    }
  
    const script = document.createElement('script');
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&callback=initMap`;
    script.async = true;
    script.defer = true;
  
    window.initMap = () => {
      setIsScriptLoaded(true);
    };
  
    script.onerror = () => {
      console.error('Google Maps script failed to load');
      setMapError('Failed to load map. Please check your internet connection or API key configuration.');
    };
  
    document.head.appendChild(script);
  
    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [isVisible]);

  // Initialize map when script loads
  useEffect(() => {
    if (isScriptLoaded) {
      initMap();
    }
  }, [isScriptLoaded, initMap]);

  // Event listeners
  useEffect(() => {
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      mapElement.addEventListener('touchstart', preventZoom, { passive: false });
    }
    
    return () => {
      if (mapElement) {
        mapElement.removeEventListener('wheel', handleWheel, { capture: true });
        mapElement.removeEventListener('touchstart', preventZoom);
      }
    };
  }, [handleWheel, preventZoom]);

  const animationClass = (isAnimated) => isAnimated ? 'slide-up' : 'slide-hidden';

  return (
    <div className={`map-section ${className}`}>
      <div className={`map-container ${animationClass(isVisible)}`}>
        {mapError ? (
          <div className="map-error">{mapError}</div>
        ) : (
          <div className="map-wrapper">
            <div 
              ref={mapRef} 
              className={`map ${isCtrlPressed ? 'ctrl-pressed' : ''} ${animationClass(mapAnimated)}`}
            />
            <div className={`map-tip ${isCtrlPressed ? 'hidden' : ''}`}>
              <span>
                <strong>Tipp:</strong> Halte die STRG-Taste gedrückt, um in der Karte zu zoomen.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Map.displayName = 'Map';

export default Map;