import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco for now

const GoogleMapComponent = ({ apiKey }) => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          alert("Error fetching directions: " + status);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div>
        <input type="text" placeholder="Enter start address" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <input type="text" placeholder="Enter destination address" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleRoute}>Get Route</button>
      </div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
