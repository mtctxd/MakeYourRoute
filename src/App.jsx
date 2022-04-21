import './App.css';

import React, { useEffect } from 'react';

import useGetCurrentLocation from './hooks/useGetCurrentLocation';
import { setLocation } from './redux/appSlice';
import { useDispatch } from 'react-redux';
import Map from './components/Map';

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
        <Map coordinates={location.coordinates}/>
      </div>
    </div>
  );
};

export default App;
