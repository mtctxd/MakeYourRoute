import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import RouteInscructions from './RouteInscructions';
import RouteCost from './RouteCost';

const RouteInfo = ({ routeSummary, pageError }) => {
  if (pageError) {
    return (
      <div className="route-info">
        <h2 className="route-info--error">{pageError.error.message}</h2>
      </div>
    );
  }

  if (routeSummary) {
    return (
      <div className="route-info">
        <div className="route-info__buttons">
          <Button colorScheme="blue">
            <Link to="/route-info">Route info</Link>
          </Button>
          <Button colorScheme="blue">
            <Link to="/route-cost">Route cost</Link>
          </Button>
        </div>

        <Routes>
          <Route
            path="/route-info"
            element={<RouteInscructions routeSummary={routeSummary} />}
          />
          <Route
            path="/route-cost"
            element={<RouteCost routeSummary={routeSummary} />}
          />
        </Routes>
      </div>
    );
  }
  return;
};

export default RouteInfo;
