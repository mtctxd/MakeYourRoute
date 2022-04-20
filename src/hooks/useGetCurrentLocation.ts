import { useState, useEffect } from 'react';

interface LocationState {
  isLoading: boolean;
  error: {
    status: boolean;
    message: string;
  };
  coordinates: {
    lat: null | number;
    lng: null | number;
  };
}

const useGetCurrentLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    isLoading: true,
    error: {
      status: false,
      message: 'There some problem with geting your locatin',
    },
    coordinates: {
      lat: null,
      lng: null,
    },
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const location_timeout = setTimeout('geolocFail()', 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(location_timeout);

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // succes
          setLocation((stateLocation) => ({
            ...stateLocation,
            isLoading: false,
            coordinates: {
              lat,
              lng,
            },
          }));
        },
        (error) => {
          clearTimeout(location_timeout);
          // reject
          setLocation((stateLocation) => ({
            ...stateLocation,
            isLoading: false,
            error: {
                status: true,
                message: 'Could not get location (timeout)',
              },
          }));
        }
      );
    } else {
      // fallback
      setLocation((stateLocation) => ({
        ...stateLocation,
        isLoading: false,
        error: {
            status: true,
            message: 'Could not get location (need premission or your device dont have any navigator.geolocation)',
          },
      }));
    }
  }

  useEffect(getCurrentLocation, []);

  return location;
};

export default useGetCurrentLocation;
