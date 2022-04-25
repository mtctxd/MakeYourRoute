import haversineDistance from "./haversineDistance";

const getDistanceMap = async (coordsArray, seter) => {
  if (!coordsArray) {
    console.log(coordsArray);
    throw 'There no information about route';
  }

  const infoHolder = {
    key: '',
    startingCoords: {
      latHolderStart: null,
      lngHolderStart: null,
    },
    endingCoords: {
      latHolderEnd: null,
      lngHolderEnd: null,
    },
    prevDistance: 0,
    distanceCounter: 0,
  };

  let {
    key,
    startingCoords: { latHolderStart, lngHolderStart },
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
              latHolderStart,
              lngHolderStart,
            },
            endingCoords: {
              latHolderEnd: lat2,
              lngHolderEnd: lng2,
            },
            distance: distanceCounter,
          };

          key = '';
          latHolderStart = null;
          lngHolderStart = null;
          distanceCounter = 0;
          acumulator.push(tempObj);
        }

        if (!key) {
          key = `${lat1},${lng1}`;
          latHolderStart = lat1;
          lngHolderStart = lng1;
        }

        distanceCounter += distance;
      }

      if (index === array.length - 1) {
        acumulator.push({
          key,
          startingCoords: {
            latHolderStart,
            lngHolderStart,
          },
          endingCoords: {
            latHolderEnd: lat1,
            lngHolderEnd: lng1,
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
