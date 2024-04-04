import React from "react";
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Weather from "./components/Weather/Weather.jsx";

const center = [64.182913, -21.164818];

function App() {
  const [position, setPosition] = useState(null);
  const [ready, setReady] = useState(false);
  const date = new Date();
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };
  const clickHandler = () => {
    setReady((ready) => !ready);
  };

  if (!ready) {
    return (
      <div className="container">
        <MapContainer
          center={center}
          zoom={10}
          style={{ width: "100vw", height: "60vh", borderRadius: "30%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationFinderDummy />
        </MapContainer>
        <div className="coordinates">
          {position ? (
            <>
              <div className="date">{date.toDateString()}</div>
              <div className="date">{date.toTimeString()}</div>
              <div>latitude: {position[0]}</div>
              <div>longitude: {position[1]}</div>
              <button onClick={clickHandler} className="button-27">
                Velja
              </button>
            </>
          ) : (
            <div>Veldu Hnit</div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <Weather lat={position[0]} lng={position[1]} />
      <div className="coordinates">
        <div className="date">{date.toDateString()}</div>
        <div className="date">{date.toTimeString()}</div>
        <div>latitude: {position[0]}</div>
        <div>longitude: {position[1]}</div>
        <button onClick={clickHandler} className="button-27">
          Til Baka
        </button>
      </div>
    </div>
  );
}

export default App;
