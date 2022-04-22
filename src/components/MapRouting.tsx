import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { useAppSelector } from '../redux/hooks';
import { Coords } from '../redux/appSlice';

const createRoutineMachineLayer = () => {
  const routeInput = useAppSelector((state) => state.appSlice.routeInput);
  const waypointsFromInput = Object.values(routeInput)
    .filter((waypoint) => waypoint.coords.lat && waypoint.coords.lng)
    .map((waypoint) => ({
      lat: waypoint.coords.lat,
      lng: waypoint.coords.lng,
    }));

  // const waypoints = waypointsFromInput.map(
  //   (item: Coords) =>
  //     item.lat &&
  //     item.lng &&
  //     new L.Routing.Waypoint(
  //       L.latLng(item.lat, item.lng),
  //       '' + item.lat + item.lat,
  //       {}
  //     )
  // ) as L.Routing.Waypoint[];
  const waypoints = waypointsFromInput.map((item: Coords) =>
    item.lat && item.lng && L.latLng(item.lat, item.lng) as unknown as L.Routing.Waypoint
  ) as L.Routing.Waypoint[];

  const instance = L.Routing.control({
    waypoints,
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
      extendToWaypoints: false,
      missingRouteTolerance: 0,
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const MapRouting = createControlComponent(createRoutineMachineLayer);

export default MapRouting;
