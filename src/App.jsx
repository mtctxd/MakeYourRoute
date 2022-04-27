import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import './App.css';

import { Map, AppInterface } from './components';

const initialRouteInfo = [
  {
    id: uuidv4(),
    adress: '',
    coords: {
      lat: null,
      lng: null,
    },
  },
  {
    id: uuidv4(),
    adress: '',
    coords: {
      lat: null,
      lng: null,
    },
  },
];

const App = () => {
  const [routeInfo, setRouteInfo] = useState(initialRouteInfo);
  const [routeSummary, setRouteSummary] = useState(null);

  return (
    <div className="app">
      <Map routeInfo={routeInfo} setRouteSummary={setRouteSummary} />
      <AppInterface
        routeManager={{ routeInfo, setRouteInfo }}
        routeSummary={routeSummary}
      />
    </div>
  );
};

export default App;
