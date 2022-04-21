import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = () => {
  // need to change code below!!!!!!!!!
  const iNeedToChangeIt = (L as any);
  const instance = (L as any).Routing.control({
    waypoints: [
      L.latLng(33.52001088075479, 36.26829385757446),
      L.latLng(33.50546582848033, 36.29547681726967),
      // (L as any).Routing.waypoint(null,"12 Morning Star place, Auckland"),
      // (L as any).Routing.waypoint(null,"198 Dominion road, Mount Roskill, Auckland")
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};



const MapRouting = createControlComponent(createRoutineMachineLayer);
console.log(MapRouting);

export default MapRouting;
