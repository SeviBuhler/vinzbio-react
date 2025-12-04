export class CustomInfoWindow {
  constructor(position, content, map) {
    this.position = position;
    this.content = content;
    this.map = map;
    this.div = null;
    this.visible = false;
    this.mapListener = null;
    this.overlay = null;
  }

  show() {
    if (this.visible) {
      return;
    }
    
    console.log('🎯 Creating InfoWindow for:', this.position);
    
    // Create container
    this.div = document.createElement('div');
    this.div.className = 'custom-info-window';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'custom-info-close';
    closeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    closeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.hide();
    };
    
    // Create content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'custom-info-content';
    contentDiv.innerHTML = this.content;
    
    // Prevent clicks inside from closing
    contentDiv.onclick = (e) => {
      e.stopPropagation();
    };
    
    // Create arrow
    const arrow = document.createElement('div');
    arrow.className = 'custom-info-arrow';
    
    // Assemble
    this.div.appendChild(closeBtn);
    this.div.appendChild(contentDiv);
    this.div.appendChild(arrow);
    
    // Add to map container (NOT to map div directly!)
    const mapDiv = this.map.getDiv();
    const parentDiv = mapDiv.parentElement; // Get map wrapper
    
    if (parentDiv) {
      parentDiv.style.position = 'relative';
      parentDiv.appendChild(this.div);
    } else {
      mapDiv.appendChild(this.div);
    }
    
    // Create overlay for positioning
    this.overlay = new window.google.maps.OverlayView();
    this.overlay.onAdd = () => {
    };
    this.overlay.draw = () => {
      this.updatePosition();
    };
    this.overlay.onRemove = () => {
      // Cleanup when overlay is removed by Google Maps
    };
    this.overlay.setMap(this.map);
    
    this.visible = true;
    
    // Initial positioning with delay
    setTimeout(() => {
      this.updatePosition();
      
      // Fade in animation
      requestAnimationFrame(() => {
        if (this.div) {
          this.div.classList.add('visible');
        }
      });
    }, 100);
    
    // Listen to map changes
    this.mapListener = this.map.addListener('bounds_changed', () => {
      this.updatePosition();
    });
  }

  hide() {
    if (!this.visible || !this.div) return;
    
    
    this.div.classList.remove('visible');
    
    setTimeout(() => {
      // Remove DOM element
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
      }
      this.div = null;
      
      // Remove map listener
      if (this.mapListener) {
        window.google.maps.event.removeListener(this.mapListener);
        this.mapListener = null;
      }
      
      // Remove overlay safely
      if (this.overlay) {
        try {
          this.overlay.setMap(null);
        } catch (error) {
        }
        this.overlay = null;
      }
      
      this.visible = false;
    }, 300);
  }

  updatePosition() {
    if (!this.div || !this.visible || !this.overlay) return;
    
    try {
      const projection = this.overlay.getProjection();
      
      if (!projection) {
        setTimeout(() => this.updatePosition(), 50);
        return;
      }
      
      // Convert lat/lng to pixel coordinates (relative to map container)
      const point = projection.fromLatLngToContainerPixel(this.position);
      
      if (point && this.div) {        
        // Position above marker with transform for centering
        const offsetY = 15; // Small gap above marker
        
        // Use transform for centering horizontally and positioning vertically
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
        this.div.style.transform = `translate(-50%, calc(-100% - ${offsetY}px))`;
      }
      
    } catch (error) {
      
      // Fallback: try with fromLatLngToDivPixel
      try {
        const projection = this.overlay.getProjection();
        
        if (projection) {
          const point = projection.fromLatLngToDivPixel(this.position);
          if (point && this.div) {
            this.div.style.left = `${point.x}px`;
            this.div.style.top = `${point.y}px`;
            this.div.style.transform = `translate(-50%, calc(-100% - 15px))`;
          }
        }
      } catch (fallbackError) {
      }
    }
  }

  isVisible() {
    return this.visible;
  }
}