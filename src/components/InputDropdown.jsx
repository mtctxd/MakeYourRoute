const InputDropdown = ({
  fetchedAdreses,
  currentActiveInputId,
  id,
  setRouteInfo,
  resetFetchedAdreses,
}) => {
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

  if (fetchedAdreses && currentActiveInputId === id) {
    return (
      <div className="app_form-input-dropdown">
        {fetchedAdreses.map((adress) => (
          <div
            className="app_form-input-dropdown-item"
            key={adress.display_name}
            onClick={() => handleClick(id, adress)}
          >
            {adress.display_name}
          </div>
        ))}
      </div>
    );
  }
};

export default InputDropdown;
