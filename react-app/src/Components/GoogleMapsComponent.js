import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "../GoogleMapsComponent.css";

const mapContainerStyle = {
  width: "100%",
  height: "500px", // Set a visible height for the map
};

const center = { lat: 37.7749, lng: -122.4194 }; //Default to San Francisco

const GoogleMapComponent = ({ apiKey }) => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);

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
      <div className="map-container">
        {/* Header */}
        <div className="map-header">
        <div className="map-header-left" /> {/* Spacer for symmetry */}
        
        <h1 className="map-title">Better Destination</h1>
        
        <img
          className="map-logo"
          src="/logo-yellow-no-text.png"
          alt="Logo"
        />
      </div>
        {/* Map + Destinations Layout */}
        <div className="map-body">
          {/* Map Panel */}
          <div className={`map-panel ${showDestinations ? "shrinked" : ""}`}>
            <div className="input-section">
              <input
                type="text"
                placeholder="Enter start address"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <div className="button-group">
                <Link to="/newtrip">
                  <button>New Trip</button>
                </Link>
                <button onClick={handleRoute}>Get Route</button>
                <button onClick={() => setShowDestinations(!showDestinations)}>
                  {showDestinations ? "Hide Destinations" : "Show Destinations"}
                </button>
              </div>
            </div>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>

          {/* Destinations Panel */}
          {showDestinations && (
            <div className="destinations-panel">
              <h2>Destinations Template</h2>

              {/* Destination 1 */}
              <div className="destination-item">
                <div className="destination-text">
                  <h3>Destination 1</h3>
                  <p>- Description</p>
                  <p>- Description</p>
                  <p>- Description</p>
                </div>
                <img
                  className="destination-image"
                  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                  alt="Destination 1"
                />
              </div>

              {/* Destination 2 */}
              <div className="destination-item">
                <div className="destination-text">
                  <h3>Destination 2</h3>
                  <p>- Description</p>
                  <p>- Description</p>
                  <p>- Description</p>
                </div>
                <img
                  className="destination-image"
                  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                  alt="Destination 2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;