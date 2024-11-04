import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import './Map.scss';

function ChangeView({ center, zoom }: { center: LatLngTuple; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function Map({
  initialCenter,
  location = 'My Location',
}: {
  initialCenter: LatLngTuple;
  location?: string;
}) {
  // Use state to track the user's current location
  const [position, setPosition] = useState<LatLngTuple>([0, 0]); // Default value to render while waiting for real GPS data

  // Update the user's position using the Geolocation API
  useEffect(() => {
    const handlePositionUpdate = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]); // Update the position state
    };

    const handlePositionError = (error: GeolocationPositionError) => {
      console.error(error);
      // Set a default location if geolocation fails (e.g., a city center or a known coordinate)
      setPosition([1.3521, 103.8198]); // Coordinates of Singapore
    };

    // Get the current position and watch for changes in position
    const geoId = navigator.geolocation.watchPosition(handlePositionUpdate, handlePositionError, {
      enableHighAccuracy: true,
      timeout: 10000,
    });

    // Cleanup on unmount
    return () => {
      navigator.geolocation.clearWatch(geoId);
    };
  }, []);

  return (
    <div data-component="Map">
      <MapContainer
        center={position} // Dynamically update the map's center based on user's location
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && position[0] !== 0 && position[1] !== 0 && (
          <Marker position={position}>
            <Popup>{location}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
