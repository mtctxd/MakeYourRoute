import haversineDistance from "./haversineDistance";

const getDistanceMap = async (coordsArray, seter) => {
  if (!coordsArray) {
    throw 'There no information about route';
  }

  const infoHolder = {
    key: '',
    startingCoords: {
      lat: null,
      lng: null,
    },
    endingCoords: {
      lat: null,
      lng: null,
    },
    prevDistance: 0,
    distanceCounter: 0,
  };

  let {
    key,
    startingCoords: { lat, lng },
    distanceCounter,
  } = infoHolder;

  const distanceArray = await coordsArray.reduce(
    (acumulator, iterator, index, array) => {
      const { lat: lat1, lng: lng1 } = iterator;

      if (index < array.length - 1) {
        const { lat: lat2, lng: lng2 } = array[index + 1];
        const distance = haversineDistance([lat1, lng1], [lat2, lng2]);
        let tempObj;

        if (distanceCounter >= 100) {
          tempObj = {
            key,
            startingCoords: {
              lat,
              lng,
            },
            endingCoords: {
              lat: lat2,
              lng: lng2,
            },
            distance: distanceCounter,
          };

          key = '';
          lat = null;
          lng = null;
          distanceCounter = 0;
          acumulator.push(tempObj);
        }

        if (!key) {
          key = `${lat1},${lng1}`;
          lat = lat1;
          lng = lng1;
        }

        distanceCounter += distance;
      }

      if (index === array.length - 1) {
        acumulator.push({
          key,
          startingCoords: {
            lat,
            lng,
          },
          endingCoords: {
            lat: lat1,
            lng: lng1,
          },
          distance: distanceCounter,
        });
      }

      return acumulator;
    },
    []
  );

  seter(distanceArray);
};

export default getDistanceMap;
