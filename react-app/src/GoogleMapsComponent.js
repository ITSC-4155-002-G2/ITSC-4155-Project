/* global google */
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./GoogleMapsComponent.css";


const mapContainerStyle = {
  width: "100%",
  height: "600px",
};


const center = { lat: 37.7749, lng: -122.4194 };


const GoogleMapComponent = ({ apiKey, libraries }) => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);


  const findAttractionsAlongRoute = async (route) => {
    if (!route || !route.routes || !route.routes[0]) return;


    const path = route.routes[0].overview_path;
    const samplePoints = [
      path[Math.floor(path.length * 0.1)],
      path[Math.floor(path.length * 0.3)],
      path[Math.floor(path.length * 0.5)],
      path[Math.floor(path.length * 0.7)],
      path[Math.floor(path.length * 0.9)],
    ];
   


    const placesService = new google.maps.places.PlacesService(mapInstance);


    const attractionsFound = await Promise.all(
      samplePoints.map(async (point) => {
        return new Promise((resolve) => {
          placesService.nearbySearch(
            {
              location: point,
              radius: 10000,
              type: "tourist_attraction",
            },
            (results, status) => {
              if (status === "OK" && results.length > 0) {
                const place = results[0];
                resolve({
                  id: place.place_id,
                  name: place.name,
                  location: place.vicinity,
                  rating: place.rating || 'No rating',
                  position: place.geometry.location,
                  photo: place.photos?.[0]?.getUrl({ maxWidth: 400}) || null,
                });
              } else {
                console.log('No attractions found at this point', status);
                resolve(null);
              }
            }
          );
        });
      })
    );


    setAttractions(attractionsFound.filter(attraction => attraction !== null));
  };


  const handleRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          findAttractionsAlongRoute(result);
        } else {
          alert("Error fetching directions: " + status);
        }
      }
    );
  };


  const addWaypoint = (attraction) => {
    setWaypoints([...waypoints, { location: attraction.position, stopover: true }]);
  };


  useEffect(() => {
    if (waypoints.length > 0 && origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [waypoints, origin, destination]);


  const onMapLoad = (map) => {
    setMapInstance(map);
  };


  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="map-container">
        <div className="map-header">
          <div className="map-header-left" />
          <h1 className="map-title">Better Destination</h1>
          <img className="map-logo" src="/logo-yellow-no-text.png" alt="Logo" />
        </div>


        <div className="map-body">
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
                <button onClick={handleRoute}>Get Route</button>
                <button onClick={() => setShowDestinations(!showDestinations)}>
                  {showDestinations ? "Hide Destinations" : "Show Destinations"}
                </button>
                <Link to="/account">
                  <button>Account</button>
                </Link>
              </div>
            </div>


            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              onLoad={onMapLoad}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>


          {showDestinations && (
            <div className="destinations-panel">
              <h2>Attractions Along Your Route</h2>
              <div className="destinations-scroll">
              {attractions.length > 0 ? (
                attractions.map((attraction) => (
                  <div key={attraction.id} className="destination-item">
                    <div className="destination-text">
                      <h3>{attraction.name}</h3>
                      <p>📍 {attraction.location}</p>
                      <p>⭐ {attraction.rating || "No rating"}</p>
                      <button
                        onClick={() => addWaypoint(attraction)}
                        className="destination-button"
                      >
                        Add to Route
                      </button>
                    </div>
                    {attraction.photo ? (
                      <img
                        className="destination-image"
                        src={attraction.photo}
                        alt={attraction.name}
                      />
                    ) : (
                      <img
                        className="destination-image"
                        src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                        alt="No photo available"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p>No attractions found along this route. Try a different route or check your inputs.</p>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};


export default GoogleMapComponent;
