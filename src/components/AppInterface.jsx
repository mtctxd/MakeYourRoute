import { useState, useEffect } from 'react';

import getAdreses from '../api/getAdreses';
import debounce from '../features/debounce';

const AppInterface = ({ routeManager: { routeInfo, setRouteInfo } }) => {
  const [fetchedAdreses, setFetchedAdreses] = useState([]);

  const handleInput = async (event, id) => {
    setRouteInfo((state) =>
      state.map((inputField) => {
        if (inputField.id === id) {
          return {
            ...inputField,
            adress: event.target.value,
          };
        }

        return inputField;
      })
    );

    debounce(async () => {
    }, 150);
    const currentAdress = routeInfo.find((adress) => adress.id === id);
    const adresesFromApi = await getAdreses(currentAdress.adress);

    setFetchedAdreses(adresesFromApi);
  };

  return (
    <div className="app__interface">
      {routeInfo.map((inputField) => {
        const { id, adress, coords } = inputField;
        return (
          <div key={id}>
            <input
              type="text"
              value={adress}
              onChange={(event) => handleInput(event, id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AppInterface;
