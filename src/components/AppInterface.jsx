import { useState, useCallback, useRef } from 'react';
import {
  Container,
  Input,
  Stack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
} from '@chakra-ui/react';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';
import RouteInfo from './RouteInfo';

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

  const handleDeboucedResize = () =>
    debounce(setWindowWidth(window.innerWidth), 200);

  window.addEventListener('resize', handleDeboucedResize);

  if (windowWidth > 564) {
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
                {fetchedAdreses && currentActiveInputId === id && (
                  <div className="app_form-input-dropdown">
                    {fetchedAdreses.map((adress) => (
                      <div
                        className="app_form-input-dropdown-item"
                        key={adress.display_name}
                        onClick={(event) => handleClick(id, adress)}
                      >
                        {adress.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </Stack>
        <div>{routeSummary && <RouteInfo routeSummary={routeSummary} />}</div>
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
                    {fetchedAdreses && currentActiveInputId === id && (
                      <div className="app_form-input-dropdown">
                        {fetchedAdreses.map((adress) => (
                          <div
                            className="app_form-input-dropdown-item"
                            key={adress.display_name}
                            onClick={(event) => handleClick(id, adress)}
                          >
                            {adress.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </Stack>
            <div>
              {routeSummary && <RouteInfo routeSummary={routeSummary} />}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue">PDF</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppInterface;
