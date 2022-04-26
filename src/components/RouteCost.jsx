import { useState } from 'react';
import { Input } from '@chakra-ui/react';

const RouteCost = ({ routeSummary }) => {
  const {
    summary: { totalDistance },
  } = routeSummary;

  const [priceInputs, setPriceInputs] = useState({
    costPerKilometer: 10,
    multiplier: 10,
  });

  const { costPerKilometer, multiplier } = priceInputs;

  const handleInput = (event) => {
    if (!isNaN(event.target.value)) {
      setPriceInputs((state) => ({
        ...state,
        [event.target.name]: +event.target.value,
      }));
    }
  };

  const kilometr = totalDistance / 1000;
  const priceCost = Math.round(
    kilometr * costPerKilometer +
      (kilometr * multiplier) / 10 +
      Math.ceil(kilometr / 800) * 1000
  );

  return (
    <div className="route-info__cost">
      <Input
        type="text"
        name="costPerKilometer"
        variant="flushed"
        value={costPerKilometer}
        onChange={handleInput}
        placeholder="Cost per kilometr"
      />
      <Input
        type="text"
        name="multiplier"
        variant="flushed"
        value={multiplier}
        onChange={handleInput}
        placeholder="price multiplier"
      />
      <span>{priceCost}</span>
    </div>
  );
};

export default RouteCost;
