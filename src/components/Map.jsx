import React, { useEffect, useRef, useState } from 'react';
import H from "@here/maps-api-for-javascript";

const Map = ({ coordinates }) => {
  // const [map, setMap] = useState(null);
  const ref = useRef();
  const {lat, lng} = coordinates || {lat: 52, lng: 32};
  let map = null;

  useEffect(() => {
    if (!map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: import.meta.env.VITE_HERE_API_KEY
      });
      const layers = platform.createDefaultLayers();
      const mapCreated = new H.Map(
        ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat, lng},
          zoom: 2,
        },
      );
      map = mapCreated;
      // const ui = H.ui.UI.createDefault(map, defaultLayers);
      // ui.getControl('zoom').setDisabled(false);
    };
  }, [])

  return (
    <div
      style={{ width: '100%', height:'100%' }}
      ref={ref}
    />
  );
};

export default Map;