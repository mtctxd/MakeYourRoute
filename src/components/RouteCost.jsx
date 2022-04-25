import { useState } from 'react';
import { Input } from '@chakra-ui/react';

const RouteCost = ({ routeSummary }) => {
  const {
    summary: { totalDistance },
  } = routeSummary;

  const [costPerKilometer, setCostPerKilometer] = useState(10);

  const handleInput = (event) => {
      setCostPerKilometer(+event.target.value);
  };

  const priceCost = (totalDistance / 1000 * costPerKilometer) * 1.1;

  return (
    <div className="route-info__cost">
      <Input
        type="text"
        variant="flushed"
        value={costPerKilometer}
        onChange={handleInput}
      />
      <span>{priceCost}</span>
    </div>
  );
};

export default RouteCost;
