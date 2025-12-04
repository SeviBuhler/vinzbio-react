export const LOCATIONS = [
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
  }
];

export const MAP_CONFIG = {
  defaultCenter: { lat: 47.421432, lng: 9.3726123 },
  defaultZoom: {
    mobile: 7.5,
    desktop: 8
  },
  minZoom: 6,
  maxZoom: 18,
  markerColor: '#E7AA4E',
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
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#A5B1C2' }]
    }
  ]
};