import { useState, useCallback, useRef, useEffect } from 'react';
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
import AppInput from './AppInput';
import jsPDF from 'jspdf';

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

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      compress: false,
      format: [window.innerWidth, window.innerHeight],
      unit: 'px',
    });

    doc.html(document.getElementById('app'), {
      callback: (pdf) => {
        pdf.save('routeInfo.pdf');
      },
    });
  };

  if (windowWidth > 564) {
    return (
      <div className="app__interface">
        <div className="app__interface-header">MakeYourRout</div>
        <div className="app__interface-container">
          <Stack>
            <Button colorScheme="blue" onClick={generatePDF}>
              Get PDF
            </Button>
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
              <Button colorScheme="blue" onClick={generatePDF}>
                Get PDF
              </Button>
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
              <RouteInfo routeSummary={routeSummary} />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppInterface;
