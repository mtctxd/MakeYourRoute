import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import './App.css';

import { Map, AppInterface } from './components';
import haversineDistance from './features/haversineDistance';

// const initialRouteInfo = [
//   {
//     id: uuidv4(),
//     adress: '',
//     coords: {
//       lat: null,
//       lng: null,
//     }
//   },
//   {
//     id: uuidv4(),
//     adress: '',
//     coords: {
//       lat: null,
//       lng: null,
//     }
//   },
// ];
const initialRouteInfo = [
  {
    id: uuidv4(),
    adress: '',
    coords: {
      lat: 50.7450733,
      lng: 25.320078,
    },
  },
  {
    id: uuidv4(),
    adress: '',
    coords: {
      lat: 51.218194499999996,
      lng: 22.554677562145155,
    },
  },
];

const App = () => {
  const [routeInfo, setRouteInfo] = useState(initialRouteInfo);
  const [routeSummary, setRouteSummary] = useState({});

  return (
    <div className="app">
      <AppInterface routeManager={{ routeInfo, setRouteInfo }} routeSummary={routeSummary}/>
      <Map routeInfo={routeInfo} setRouteSummary={setRouteSummary} />
    </div>
  );
};

export default App;
