import './App.css';

import { useEffect } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { inputHandler, setLocation } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const App = () => {
  const location = useGetCurrentLocation();
  const { find } = useAppSelector((state) => state.appSlice.input);

  const dispatch = useAppDispatch();
  console.log(location);

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

  return (
    <div className="app">
      <div className="app__interface">interface</div>

      <div className="leaflet-container">
        {location.coordinates.lat && location.coordinates.lng && (
          <MapContainer
            center={[location.coordinates.lat, location.coordinates.lng]}
            zoom={13}
            scrollWheelZoom={true}
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
        )}
      </div>
    </div>
  );
};

export default App;
