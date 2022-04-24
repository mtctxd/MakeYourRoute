import { MapContainer, TileLayer } from 'react-leaflet';
import Routing from './Routing';

const Map = ({ routeInfo }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing routeInfo={routeInfo} />
    </MapContainer>
  );
};

export default Map;
