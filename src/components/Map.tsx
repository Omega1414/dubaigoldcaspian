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

    const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
      <a href="https://www.google.com/maps?q=25.05864911447676,55.13582628336014" target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    `);

    new maplibregl.Marker({ color: '#C084FC' })
      .setLngLat([55.13582628336014, 25.05864911447676])
      .setPopup(popup) 
      .addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
