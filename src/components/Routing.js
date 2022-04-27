import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const Routing = ({ routeInfo, setRouteSummary, setPageError }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: routeInfo.map((waypoint) => {
        const { lat, lng } = waypoint.coords;
        return { latLng: L.latLng(lat, lng) };
      }),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      show: true,
      showAlternatives: false,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControl.on('routesfound', (e) => {
      setRouteSummary(e.routes[0]);
      setPageError(false);
    });

    routingControl.on('routingerror', (e) => setPageError(e));

    return () => map.removeControl(routingControl);
  }, [map, routeInfo]);

  return null;
};

export default Routing;
