const AppInterface = ({ routeManager: { routeInfo, setRouteInfo } }) => {

  return (
    <div className="app__interface">
      {routeInfo.map((inputField) => {
          const {adress, coords} = inputField;
          return (
            <input type="text" value={adress} />
          );
      })}
    </div>
  );
};

export default AppInterface;
