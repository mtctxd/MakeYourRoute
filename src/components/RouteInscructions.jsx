import validDateString from "../features/validDateString";

const RouteInscructions = ({ routeSummary }) => {
  const {
    name,
    summary: { totalDistance, totalTime },
    instructions,
  } = routeSummary;

  return (
    <div className="route-info__instructions">
      <div className="route-info__header">
        <div>{name}</div>
        <div>{`${Math.round(totalDistance / 10) / 100} km`}</div>
        <div>{validDateString(totalTime)}</div>
      </div>
      <ul className="route-info__instructions-list">
        {instructions.map((instruction) => (
          <li
            className="route-info__instruction-list-item"
            key={instruction.text + instruction.distance}
          >
            <div>{instruction.text}</div>
            <div>{instruction.distance}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteInscructions;
