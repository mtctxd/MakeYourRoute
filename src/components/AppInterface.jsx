import { useState, useCallback, useEffect } from 'react';
// import { throttle, debounce } from 'lodash';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';

const initialFetchedAdress = [];

const AppInterface = ({ routeManager: { routeInfo, setRouteInfo } }) => {
  const [fetchedAdreses, setFetchedAdreses] = useState(initialFetchedAdress);
  const [currentActiveInputId, setCurrentActiveInputId] = useState(null);

  const handleInput = (id, event) => {
    setRouteInfo((state) =>
      state.map( (waypoint) => {
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

  const processAdresses = async(adress) => {
    const adreses = await getAdreses(adress);
    setFetchedAdreses(adreses);
  };

    const throttledProcessAdresses = useCallback(debounce(processAdresses, 150), []);

  return (
    <div className="app__interface">
      {routeInfo.map((inputField) => {
        const { id } = inputField;
        return (
          <div key={id}>
            <input type="text" onChange={(event) => handleInput(id, event)} />
            {fetchedAdreses &&
              currentActiveInputId === id &&
              fetchedAdreses.map((adress) => (
                <div key={adress.display_name}>{adress.display_name}</div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default AppInterface;
