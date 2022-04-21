import './App.css';

import { useEffect, useRef, useState } from 'react';

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


export interface Adress {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	icon: string;
}

interface FetchedAdress {
  key: string,
  info: Adress[]
}

const App = () => {
  const leafletMap = useRef<any>();
  const location = useGetCurrentLocation();
  const { routeInput } = useAppSelector((state) => state.appSlice);
  const [fetchedAdresses, setFetchedAdresses] = useState<FetchedAdress>({key: '', info: []});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);

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
            <div key={key} className={`${fetchedAdresses.key === key && 'app_form-input-container'}`}>
              <input
                type="text"
                value={value}
                onChange={(event) => {
                  handleInputFieldOnChange(event, key);
                  getLocationPointsForInput(
                    event.target.value,
                    setFetchedAdresses,
                    key,
                  );
                }}
              />
              {fetchedAdresses.key === key && (
                <div className='app_form-input-dropdown'>
                  {fetchedAdresses.info.map((item) => (
                  <div className='app_form-input-dropdown-item'>
                    {item.display_name}
                  </div>
                ))}
                </div>
              )}
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
