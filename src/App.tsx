import './App.css';

import { useEffect, useRef } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import {
  addNodeToRouteInput,
  inputHandler,
  setLocation,
} from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MapRouting from './components/MapRouting';
import { getLocationPointsForInput } from './features/getLocationPointsForInput';

const App = () => {
  const leafletMap = useRef<any>();
  const location = useGetCurrentLocation();
  const { routeInput } = useAppSelector((state) => state.appSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

  useEffect(() => {
    getLocationPointsForInput('lviv');
  }, []);

  const handleInputFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: string
  ) => {
    dispatch(
      inputHandler({
        index,
        text: event.target.value,
      })
    );
  };

  // https://nominatim.openstreetmap.org/search?format=json&limit=3&q=lutsk

  const addNode = () => {
    dispatch(addNodeToRouteInput());
  };

  return (
    <div className="app">
      <div className="app__interface">
        <div className="app__route-info">
          <a href="#" className="app__route-info-link">
            info
          </a>
        </div>
        <div className="app__route-price">
          <a href="#" className="app__route-price-link">
            price
          </a>
        </div>
        <div className="app__form">
          {Object.entries(routeInput).map(([key, value]) => (
            <div key={key}>
              <input
                type="text"
                value={value}
                onChange={(event) => {
                  handleInputFieldOnChange(event, key);
                  getLocationPointsForInput(event.target.value).then((res) =>
                    console.log(res)
                  );
                }}
              />
            </div>
          ))}
          <button onClick={addNode}>+</button>
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
          <MapRouting />
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
