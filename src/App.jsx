import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import './App.css';

import AppInterface from './components/AppInterface';
import Map from './components/Map';

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
  const [pageError, setPageError] = useState(null);

  return (
    <div className="app">
      <Map
        routeInfo={routeInfo}
        setRouteSummary={setRouteSummary}
        setPageError={setPageError}
      />
      <AppInterface
        routeManager={{ routeInfo, setRouteInfo }}
        routeSummary={routeSummary}
        pageError={pageError}
      />
    </div>
  );
};

export default App;
