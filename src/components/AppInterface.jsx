import { useState, useCallback } from 'react';
import { Container, Input, Stack } from '@chakra-ui/react';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';

const initialFetchedAdress = [];

const AppInterface = ({ routeManager: { routeInfo, setRouteInfo } }) => {
  const [fetchedAdreses, setFetchedAdreses] = useState(initialFetchedAdress);
  const [currentActiveInputId, setCurrentActiveInputId] = useState(null);

  const processAdresses = async (adress) => {
    const adreses = await getAdreses(adress);
    setFetchedAdreses(adreses);
  };

  const throttledProcessAdresses = useCallback(
    debounce(processAdresses, 200),
    []
  );

  const handleInput = (id, event) => {
    setRouteInfo((state) =>
      state.map((waypoint) => {
        if (waypoint.id === id) {
          const newWaypoint = {
            ...waypoint,
            adress: event.target.value,
          };

          return newWaypoint;
        }

        return waypoint;
      })
    );

    setCurrentActiveInputId(id);

    throttledProcessAdresses(event.target.value);
  };

  const resetFetchedAdreses = () => {
    setFetchedAdreses(initialFetchedAdress);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setRouteInfo((state) =>
        state.map((waypoint) => {
          if (waypoint.id === currentActiveInputId && fetchedAdreses) {
            const { display_name, lat, lon: lng } = fetchedAdreses[0];

            return {
              ...waypoint,
              adress: display_name,
              coords: {
                lat,
                lng,
              },
            };
          }

          return waypoint;
        })
      );

      resetFetchedAdreses();
    }
  };

  const handleClick = (id, adress) => {
    setRouteInfo((state) =>
      state.map((waypoint) => {
        if (waypoint.id === id) {
          const { display_name, lat, lon: lng } = adress;

          return {
            ...waypoint,
            adress: display_name,
            coords: {
              lat,
              lng,
            },
          };
        }

        return waypoint;
      })
    );

    resetFetchedAdreses();
  };

  return (
    <div className="app__interface">
      <Stack spacing={3}>
        {routeInfo.map((inputField) => {
          const { id, adress } = inputField;
          return (
            <div key={id}>
              <Input
                type="text"
                value={adress}
                variant="flushed"
                onChange={(event) => handleInput(id, event)}
                onKeyDown={handleKeyDown}
                onBlur={resetFetchedAdreses}
              />
              {fetchedAdreses &&
                currentActiveInputId === id &&
                fetchedAdreses.map((adress) => (
                  <Container
                    key={adress.display_name}
                    onClick={(event) => handleClick(id, adress)}
                  >
                    {adress.display_name}
                  </Container>
                ))}
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default AppInterface;
