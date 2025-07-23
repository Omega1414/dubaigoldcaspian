import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      center: [55.13582628336014, 25.05864911447676],
      zoom: 16,
    });

    // Create marker and popup separately
    const marker = new maplibregl.Marker({ color: '#C084FC' })
      .setLngLat([55.13582628336014, 25.05864911447676])
      .addTo(map);

    const popup = new maplibregl.Popup({
      offset: 25,
      closeOnClick: false,  // Keep popup open when clicking elsewhere
      closeButton: true    // Show close button
    }).setHTML(`
      <a href="https://www.google.com/maps?q=25.05864911447676,55.13582628336014" target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    `);

    // Add popup to marker but prevent automatic panning
    marker.setPopup(popup);

    // Open popup immediately but without animation/panning
    map.on('load', () => {
      // This is the key - prevents map from panning to show popup
      popup.addTo(map);
      popup.setLngLat([55.13582628336014, 25.05864911447676]);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;