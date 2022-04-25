import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RouteInscructions from './RouteInscructions';
import RouteCost from './RouteCost';


const RouteInfo = ({ routeSummary }) => {
  return (
    <div className="route-info">
      <Link to="/route-info">Route info</Link>
      <Link to="/route-cost">Coute cost</Link>
      <Routes>
        <Route
          path="/route-info"
          element={<RouteInscructions routeSummary={routeSummary} />}
        />
        <Route path="/route-cost" element={<RouteCost routeSummary={routeSummary} />} />
      </Routes>
    </div>
  );
};

export default RouteInfo;
