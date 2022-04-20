import './App.css';

import { useEffect } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { inputHandler, setLocation } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const App = () => {
  const location = useGetCurrentLocation();
  const { find } = useAppSelector(state => state.appSlice.input);

  const dispatch = useAppDispatch();
  console.log(location);

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

  if (location.isLoading) {
    return <h1>LOADING...</h1>;
  }

  if (location.error.status) {
    return <h1>Some error occure</h1>;
  }

  if (location.coordinates.lat && location.coordinates.lng) {
    return (
      <div className='app'>
        <div className="app__interface">
          aside
          <input 
            type="text" 
            value={find}
            onChange={(event) => {
              dispatch(inputHandler(event.target.value))
            }}
          />
        </div>
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
      </div>
    );
  }

  return null;
};

export default App;
