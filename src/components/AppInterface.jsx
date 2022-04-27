import { useState, useCallback, useRef, useEffect } from 'react';
import { Stack, Button, useDisclosure } from '@chakra-ui/react';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';
import RouteInfo from './RouteInfo';
import AppInput from './AppInput';
import AppInterfacePC from './AppInterfacePC';
import AppInterfaceMobile from './AppInterfaceMobile';

const initialFetchedAdress = [];

const AppInterface = ({
  routeManager: { routeInfo, setRouteInfo },
  routeSummary,
  pageError,
}) => {
  const [fetchedAdreses, setFetchedAdreses] = useState(initialFetchedAdress);
  const [currentActiveInputId, setCurrentActiveInputId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      rootEl.current?.contains(e.target) || resetFetchedAdreses();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const processAdresses = async (adress) => {
    const adreses = await getAdreses(adress);
    setFetchedAdreses(adreses);
  };

  const throttledProcessAdresses = useCallback(
    debounce(processAdresses, 250),
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
    if (event.key === 'Enter' && fetchedAdreses.length > 0) {
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

  const inputPlaceholder = (index, array) => {
    switch (true) {
      case index === 0:
        return 'Enter start point';

      case index === array.length - 1:
        return 'Enter end point';

      default:
        return `Enter ${index + 1} point`;
    }
  };

  const handleDeboucedResize = () =>
    debounce(setWindowWidth(window.innerWidth), 200);

  window.addEventListener('resize', handleDeboucedResize);

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

  if (windowWidth > 564) {
    return (
      <AppInterfacePC>
        <Stack spacing={4}>
          {routeInfo.map(({ id, adress }, index) => (
            <AppInput
              key={id}
              id={id}
              adress={adress}
              index={index}
              currentActiveInputId={currentActiveInputId}
              routeInfo={routeInfo}
              fetchedAdreses={fetchedAdreses}
              inputPlaceholder={inputPlaceholder}
              handleInput={handleInput}
              handleKeyDown={handleKeyDown}
              handleClick={handleClick}
            />
          ))}
          <RouteInfo routeSummary={routeSummary} pageError={pageError} />
        </Stack>
      </AppInterfacePC>
    );
  }

  return (
    <>
      <div className="button-on-mobile">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Menu
        </Button>
      </div>
      <AppInterfaceMobile isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
        <Stack spacing={4}>
          {routeInfo.map(({ id, adress }, index) => (
            <AppInput
              id={id}
              adress={adress}
              index={index}
              currentActiveInputId={currentActiveInputId}
              routeInfo={routeInfo}
              fetchedAdreses={fetchedAdreses}
              inputPlaceholder={inputPlaceholder}
              handleInput={handleInput}
              handleKeyDown={handleKeyDown}
              handleClick={handleClick}
            />
          ))}
          <RouteInfo routeSummary={routeSummary} pageError={pageError} />
        </Stack>
      </AppInterfaceMobile>
    </>
  );
};

export default AppInterface;
