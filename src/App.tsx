import './App.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { increment, setLocation } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

const App = () => {
  const location = useGetCurrentLocation();
  const counter = useAppSelector((store) => store.appSlice.value);
  const store = useAppSelector((store) => store.appSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location))
  }, [location]);

  console.log(store);
  const position = [51.505, -0.09];

  return (
    <>
      <div className="App">
        <button onClick={() => dispatch(increment())}>{counter}</button>
      </div>
    </>
  );
};

export default App;
