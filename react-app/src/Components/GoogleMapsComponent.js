import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco for now

const GoogleMapComponent = ({ apiKey }) => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDestinations, setShowDestinations] = useState(false); // State for controlling the layout

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
      <div style={{ display: "flex", height: "100vh" }}>
        
        {/* Map Column (75%)*/}
        <div style={{ width: showDestinations ? "75%" : "100%", height: "100%" }}>
          <input type="text" placeholder="Enter start address" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          <input type="text" placeholder="Enter destination address" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <button onClick={handleRoute}>Get Route</button>    
          <button onClick={() => setShowDestinations(!showDestinations)}>Destinations Template</button>

          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

        {/* Destinations Column (25%) */}
        {showDestinations && (
          <div style={{ width: "25%", padding: "20px", height: "100%" }}>
          {/* Destinations Template */}
          <h2>Destinations Template</h2>
        
          {/* Destination 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <h3 style={{ gridColumn: "span 2", marginLeft: "10px" }}>Destination 1</h3> {/* Title spans both columns */}
            <div style={{ marginLeft: "20px" }}>
              <p>- Description</p>
              <p>- Description</p>
              <p>- Description</p>
            </div>
            <img src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="Destination 1" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          </div>
        
          {/* Destination 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <h3 style={{ gridColumn: "span 2", marginLeft: "10px" }}>Destination 2</h3> {/* Title spans both columns */}
            <div style={{ marginLeft: "20px" }}>
              <p>- Description</p>
              <p>- Description</p>
              <p>- Description</p>
            </div>
            <img src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="Destination 2" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          </div>
        </div>
        
        )}
      </div>

    </LoadScript>
  );
};

export default GoogleMapComponent;


