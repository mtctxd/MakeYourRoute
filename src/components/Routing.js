import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const Routing = ({ routeInfo }) => {
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
      showAlternatives: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControl.on('routesfound', function (e) {
      // distance = e.routes[0].summary.totalDistance;
      // console.log('routing distance: ' + distance);
      console.log(e.routes[0]);
    });

    return () => map.removeControl(routingControl);
  }, [map, routeInfo]);

  return null;
};

export default Routing;
