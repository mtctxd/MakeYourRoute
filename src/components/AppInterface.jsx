import { useState, useCallback, useRef } from 'react';
import {
  Input,
  Stack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/react';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';
import RouteInfo from './RouteInfo';
import InputDropdown from './InputDropdown';

const initialFetchedAdress = [];

const AppInterface = ({
  routeManager: { routeInfo, setRouteInfo },
  routeSummary,
}) => {
  const [fetchedAdreses, setFetchedAdreses] = useState(initialFetchedAdress);
  const [currentActiveInputId, setCurrentActiveInputId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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

  const inputPlaceholder = (index, array) => {
    switch (true) {
      case index === 0:
        return 'Enter start point'

      case index === array.length - 1:
        return 'Enter end point'
    
      default:
        return `Enter ${index + 1} point`
    };
  }

  const handleDeboucedResize = () =>
    debounce(setWindowWidth(window.innerWidth), 200);

  window.addEventListener('resize', handleDeboucedResize);

  if (windowWidth > 564) {
    return (
      <div className="app__interface">
        <div className="app__interface-header">MakeYourRout</div>
        <div className="app__interface-container">
          <Stack>
            <Button colorScheme="blue">Get PDF</Button>

            {routeInfo.map((inputField, index) => {
              const { id, adress } = inputField;
              return (
                <div key={id} className="app_form-input-container">
                  <Input
                    type="text"
                    placeholder={inputPlaceholder(index, routeInfo)}
                    value={adress}
                    variant="flushed"
                    onChange={(event) => handleInput(id, event)}
                    onKeyDown={handleKeyDown}
                    onBlur={resetFetchedAdreses}
                  />
                  <InputDropdown
                    currentActiveInputId={currentActiveInputId}
                    id={id}
                    fetchedAdreses={fetchedAdreses}
                    adress={adress}
                    setFetchedAdreses={setFetchedAdreses}
                    resetFetchedAdreses={resetFetchedAdreses}
                  />
                </div>
              );
            })}
          <RouteInfo routeSummary={routeSummary} />
          </Stack>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="button-on-mobile">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Menu
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MakeYourRout</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <Button colorScheme="blue">Get PDF</Button>
              {routeInfo.map((inputField, index) => {
                const { id, adress } = inputField;
                return (
                  <div key={id}>
                    <Input
                      type="text"
                      placeholder={inputPlaceholder(index, routeInfo)}
                      value={adress}
                      variant="flushed"
                      onChange={(event) => handleInput(id, event)}
                      onKeyDown={handleKeyDown}
                      onBlur={resetFetchedAdreses}
                    />
                    <InputDropdown
                      currentActiveInputId={currentActiveInputId}
                      id={id}
                      fetchedAdreses={fetchedAdreses}
                      adress={adress}
                      setFetchedAdreses={setFetchedAdreses}
                      resetFetchedAdreses={resetFetchedAdreses}
                    />
                  </div>
                );
              })}
                <RouteInfo routeSummary={routeSummary} />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppInterface;
