import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import './App.css';

import {Map, AppInterface} from './components';

const initialRouteInfo = [
  {
    id: uuidv4(),
    adress: '',
    coords: {
      lat: null,
      lng: null,
    }
  },
  {
    id: uuidv4(),
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
