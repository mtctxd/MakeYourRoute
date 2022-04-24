import './App.css';
import { useState } from 'react';
import {Map, AppInterface} from './components';

const initialRouteInfo = [
  {
    adress: '',
    coords: {
      lat: null,
      lng: null,
    }
  },
  {
    adress: '',
    coords: {
      lat: null,
      lng: null,
    }
  },
];

const App = () => {
  const [routeInfo, setRouteInfo] = useState(initialRouteInfo);

  return (
    <div className="app">
      <AppInterface routeManager={{routeInfo, setRouteInfo}}/>
      <Map />
    </div>
  );
};

export default App;
