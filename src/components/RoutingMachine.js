import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

// const createRoutineMachineLayer = ({routeInfo}) => {
//   const instance = L.Routing.control({
//     waypoints: [
//       L.latLng(33.52001088075479, 36.26829385757446),
//       L.latLng(33.50546582848033, 36.29547681726967),
//     ],
//   });
//   // const instance = L.Routing.control({
//   // });

//   // instance.getPlan().setWaypoints(routeInfo.map(waypoint => ({
//   //   latLng: L.latLng([waypoint.coords.lat, waypoint.coords.lng])
//   // })));
//   // instance.getPlan().setWaypoints([
//   //   {latLng: L.latLng([0, 0])},
//   //   {latLng: L.latLng([50, 0])},
//   // ]);

//   return instance;
// };

// const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// export default RoutingMachine;

const createRoutineMachineLayer = ({ routeInfo }) => {
  const map = useMap();

  
  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: routeInfo.map(waypoint => {
        const {lat, lng} = waypoint.coords;
        console.log(waypoint);
        return {latLng: L.latLng(lat, lng)};
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
    
    // console.log(routingControl);
    return () => map.removeControl(routingControl);
  }, [map, routeInfo]);


  return null;
};

export default createRoutineMachineLayer;
