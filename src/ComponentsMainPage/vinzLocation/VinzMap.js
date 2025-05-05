import React, { useRef, useState, useEffect, useCallback } from 'react';
import './vinzMapStyles.css';

const VinzMap = () => {
  const mapRef = useRef(null);
  const ctrlKeyRef = useRef(false);
  const mapInstanceRef = useRef(null);
  
  // States
  const [isVisible, setIsVisible] = useState(false);
  const [mapAnimated, setMapAnimated] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);


  // Get locations
  const getLocations = useCallback(() => [
    { 
        name: "l'Ultimo Bacio St.Gallen", 
        address: 'Poststrasse 14, 9000 St. Gallen', 
        lat: 47.421432,
        lng: 9.3726123,
        description: 'Bistro und Bioladen',
        website: 'https://www.ultimobacio.ch/stgallen',
        googleMaps: "https://www.google.ch/maps/place/L'Ultimo+Bacio/@47.4246904,9.3698457,17z/data=!3m2!4b1!5s0x479b1e4bd7bdb37d:0x3b87c9adc82bd4d0!4m6!3m5!1s0x479b1e4bd7b44791:0x7f6adf4e1f0af831!8m2!3d47.4246904!4d9.3724206!16s%2Fg%2F11c3trm6b3?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D"
    },
    { 
        name: 'Engel Tattoo', 
        address: 'Lämmlisbrunnenstrasse 53, 9000 St. Gallen', 
        lat: 47.426069,
        lng: 9.382212,
        description: 'Geniesse zu deinem neuen Tattoo ein vinz.',
        website: 'https://www.engeltattoo.ch/',
        googleMaps: 'https://www.google.ch/maps/place/Engel+Tattoo+GmbH/@47.4261116,9.3772867,17z'
    },
    { 
        name: 'FigurenTheater St.Gallen', 
        address: 'Lämmlisbrunnenstrasse 34, 9000 St. Gallen', 
        lat: 47.425011,
        lng: 9.38158,
        description: 'Im Theater ein frisches vinz.',
        website: 'https://figurentheater-sg.ch/',
        googleMaps: 'https://www.google.ch/maps/place/FigurenTheater+St.Gallen/@47.4250288,9.379478,17z'
    },
    { 
        name: 'Kiosk Hochwacht', 
        address: 'Teufener Str. 121, 9000 St. Gallen, Schweiz', 
        lat: 47.4135208,
        lng: 9.363848,
        description: 'Ein kleiner Kiosk mit vinz.',
        googleMaps: 'https://www.google.ch/maps/place/Kiosk+Hochwacht/@47.4135236,9.3609682,17z/data=!3m1!4b1!4m6!3m5!1s0x479b1f0065e0cec7:0xccb43fb565c213da!8m2!3d47.41352!4d9.3635431!16s%2Fg%2F11vrzm9db7?hl=de&entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D'
    },
    { 
        name: "l'Ultimo Bacio Witerthur", 
        address: 'Obertor 5, 8400 Winterthur, Schweiz', 
        lat: 47.4999428,
        lng: 8.7330123,
        description: 'Bio & Feinkostladen',
        website: 'https://www.ultimobacio.ch/',
        googleMaps: "https://www.google.ch/maps/place/L'Ultimo+Bacio/@47.4999566,8.7304261,17z/data=!3m1!4b1!4m6!3m5!1s0x479a999cade68a17:0xaebfcf7e94cec43e!8m2!3d47.499953!4d8.733001!16s%2Fg%2F113k16s82?hl=de&entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D"
    },
    { 
        name: "l'Ultimo Bacio Wipkingen", 
        address: 'Nordstrasse 227, 8037 Zürich, Schweiz', 
        lat: 47.3937011,
        lng: 8.5283789,
        description: 'Bio & Feinkostladen',
        website: 'https://www.ultimobacio.ch/',
        googleMaps: "https://www.google.ch/maps/place/L'Ultimo+Bacio/@47.3937121,8.525819,17z/data=!3m1!4b1!4m6!3m5!1s0x47900a69141abadb:0x88784b250b182c31!8m2!3d47.3937085!4d8.5283939!16s%2Fg%2F1tfpyrt8?hl=de&entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D"
    },
  ], []);


  const preventZoom = useCallback((e) => {
    // Prevent pinch zoom on mobile
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
      const delta = e.deltaY < 0 ? 1 : -1; // 1 for zoom in, -1 for zoom out
      const zoom = map.getZoom();
      
      // Get mouse position relative to map container
      const rect = mapRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const bounds = map.getBounds();
      const projection = map.getProjection();
      
      if (!bounds || !projection) {
        // Fallback if bounds or projection aren't available
        map.setZoom(zoom + delta);
        return false;
      }
      
      // Convert pixel coordinates to lat/lng
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      
      const targetLat = ne.lat() - (mouseY / mapRef.current.offsetHeight) * (ne.lat() - sw.lat());
      const targetLng = sw.lng() + (mouseX / mapRef.current.offsetWidth) * (ne.lng() - sw.lng());
      
      // Remember the point under cursor
      const targetPoint = new window.google.maps.LatLng(targetLat, targetLng);
      
      // Get distance from center
      const currentCenter = map.getCenter();
      const latDistance = targetPoint.lat() - currentCenter.lat();
      const lngDistance = targetPoint.lng() - currentCenter.lng();
      
      // Change the zoom level
      map.setZoom(zoom + delta);
      
      // Calculate offset factor based on zoom direction
      // More extreme when zooming in, more subtle when zooming out
      const panFactor = delta > 0 ? 0.5 : -0.15;
      
      // Apply pan to keep the point under cursor
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
    if (!mapRef.current || !window.google) return;

    try {
      const locations = getLocations();
      
      const mapOptions = {
        center: { lat: 47.421432, lng: 9.3726123 },
        zoom: 8,
        mapTypeControl: true,
        mapTypeId: 'terrain',
        streetViewControl: false,
        zoomControl: true,
        fullscreenControl: true,
        gestureHandling: 'cooperative',
        draggable: true,
        scrollwheel: false,
        minZoom: 6,
        maxZoom: 18,
        mapTypeControlOptions: window.google ? {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
        } : undefined,
        // Custom map styling
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#D3EBFA' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ACBF4' }]
          },
          
          // Landscape
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#C3D99B' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#C3D99B' }]
          },
          {
            featureType: 'landscape.natural.landcover',
            elementType: 'geometry',
            stylers: [{ color: '#C3D99B' }]
          },
          {
            featureType: 'landscape.natural.terrain',
            elementType: 'geometry',
            stylers: [{ color: '#A8C880' }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [{ color: '#E0E0E0' }]
          },
          
          // Roads
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#8BA5C1' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#7B95AD' }]
          },
          
          // Points of interest
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#B0D683' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#A8D174' }]
          },
          
          // Administrative boundaries
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#7A7D84' }, { weight: 1 }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text',
            stylers: [{ color: '#5B5B5B' }, { weight: 0.5 }]
          },
          
          // Transit
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#A5B1C2' }]
          }
        ]
      };

      // Create map
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Wait for the map to load
      map.addListener('projection_changed', () => {
        console.log('Map projection ready');
      });

      // Wait for the map to be idle before trying zoom-to-cursor functions
      map.addListener('idle', () => {
        console.log('Map is idle and ready for interactions');
      });

      // Create bounds for markers
      const bounds = new window.google.maps.LatLngBounds();

      // Add markers for each location
      locations.forEach(location => {
        bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));

        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60">
                <path d="M24 0 C37 0 48 11 48 24 C48 38 24 60 24 60 C24 60 0 38 0 24 C0 11 11 0 24 0 Z" fill="#E7AA4E" stroke="#FFFFFF" stroke-width="2"/>
                <circle cx="24" cy="24" r="12" fill="white"/>
                <text x="24" y="29" text-anchor="middle" font-size="18" font-weight="bold" fill="#E7AA4E" font-family="Arial">
                  V
                </text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(36, 45),
            anchor: new window.google.maps.Point(18, 45),
            labelOrigin: new window.google.maps.Point(18, -10)
          },
          animation: window.google.maps.Animation.DROP
        });

        // Info window for marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width:320px; font-family: Arial, sans-serif; border-radius:8px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.15); border:1px solid rgba(0,0,0,0.1);">
              <div style="background: #E7AA4E; padding:12px; border-radius:8px 8px 0 0; display:flex; align-items:center; gap:10px;">
                <h3 style="margin:0; color:white; font-size:16px; font-weight:600;">${location.name}</h3>
              </div>
              <div style="background:white; padding:15px; border-radius:0 0 8px 8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                <p style="margin:0; font-size:14px; color:#555;">${location.address}</p>
                ${location.description ? `<p style="margin:8px 0 0; font-size:13px; color:#777;">${location.description}</p>` : ''}
                <div style="margin-top:15px; display:flex; gap:10px;">
                  ${location.website ? `
                    <a href="${location.website}" target="_blank" rel="noreferrer" style="flex:1; text-align:center; background-color:#E7AA4E; color:white; text-decoration:none; padding:8px; border-radius:6px; font-size:13px;">Website</a>
                  ` : ''}
                  ${location.googleMaps ? `
                    <a href="${location.googleMaps}" target="_blank" rel="noreferrer" style="flex:1; text-align:center; background-color:#4285F4; color:white; text-decoration:none; padding:8px; border-radius:6px; font-size:13px;">Route</a>
                  ` : ''}
                </div>
              </div>
            </div>
          `,
          maxWidth: 320,
          pixelOffset: new window.google.maps.Size(0, -5),
          disableAutoPan: true,
        });

        // Add click event to marker
        marker.addListener('click', () => {
            setTimeout(() => {
              infoWindow.open(map, marker);
            }, 150);
        });
      });

      // Fit map to markers
      map.fitBounds(bounds);
      
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error loading map. Please try again.');
      // More specific error messages based on the error type
      if (error.message && error.message.includes('api key')) {
        setMapError('Invalid Google Maps API key. Please check your configuration.');
      } else {
        setMapError('Error loading map. Please try again later.');
      }
    }
  }, [getLocations]);

  // Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setMapAnimated(true), 300);
      } else {
        setIsVisible(false);
        setMapAnimated(false);
      }
    }, {
      threshold: 0.3
    });

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

  // Handle Ctrl key for map zoom
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

  // Load Google Maps script
  useEffect(() => {
    if (!isVisible) return;
    console.log("API Key available:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? "Yes" : "No");
    
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      return;
    }
  
    const script = document.createElement('script');
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    console.log("Using API Key:", apiKey ? "Available (not showing for security)" : "Missing");
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

  // Initialize map when script is loaded
  useEffect(() => {
    if (isScriptLoaded) {
      initMap();
    }
  }, [isScriptLoaded, initMap]);

  // Clean up event listeners
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

  const getAnimationClass = (isAnimated) => {
    return isAnimated ? 'slide-up' : 'slide-hidden';
  };

  return (
    <div className="map-section">
      <div className={`map-container ${getAnimationClass(isVisible)}`}>
        {mapError ? (
          <div className="map-error">
            {mapError}
          </div>
        ) : (
          <div className="map-wrapper">
            <div 
              ref={mapRef} 
              className={`map ${isCtrlPressed ? 'ctrl-pressed' : ''} ${getAnimationClass(mapAnimated)}`}
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
};

export default VinzMap;