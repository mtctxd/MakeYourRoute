import './App.css';

import { useEffect, useRef } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { addNodeToRoute, inputHandler, setLocation } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MapRouting from './components/MapRouting';

const App = () => {
  const leafletMap = useRef<any>();
  const location = useGetCurrentLocation();
  const { route } = useAppSelector((state) => state.appSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

  const addNode = () => {
    dispatch(addNodeToRoute());
  };

  // console.log(import.meta.env.VITE_HERE_API_KEY);
  console.log(leafletMap.current);

  return (
    <div className="app">
      <div className="app__interface">
        <div className="app__route-info">
          <a href="#" className="app__route-info-link">info</a>
        </div>
        <div className="app__route-price">
          <a href="#" className="app__route-price-link">price</a>
        </div>
        <div className="app__form">
          <button
            onClick={addNode}
          >
            +
          </button>
          {route.map((item, index) => (
            <input 
              type="text"
              value={item}
              onChange={(event) => {
                dispatch(inputHandler({
                  index,
                  text: event.target.value,
                }))
              }}
            />
          ))}
        </div>
      </div>

      <div className="leaflet-container">
        <MapContainer
          ref={leafletMap}
          center={[
            location.coordinates.lat ?? 51,
            location.coordinates.lng ?? 31,
          ]}
          zoom={10}
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
          <MapRouting map={leafletMap} />
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
