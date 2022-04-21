import './App.css';

import React, { useEffect } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { setLocation } from './redux/appSlice';
import { useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const App = () => {
  const location = useGetCurrentLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

  // console.log(import.meta.env.VITE_HERE_API_KEY);

  if (location.isLoading) {
    return <h1>LOADING...</h1>;
  }

  if (location.error.status) {
    return <h1>Some error occure</h1>;
  }

  return (
    <div className="app">
      <div className="app__interface">interface</div>
      <div className="map__container">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
