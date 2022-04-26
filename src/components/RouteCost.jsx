import { useState } from 'react';
import { Input, Stack } from '@chakra-ui/react';
import {
  DEFAULT_COST_MULTIPLIER,
  DEFAULT_COST_PER_KILOMETER,
} from '../constants';

const RouteCost = ({ routeSummary }) => {
  const {
    summary: { totalDistance },
  } = routeSummary;

  const [priceInputs, setPriceInputs] = useState({
    costPerKilometer: DEFAULT_COST_PER_KILOMETER,
    multiplier: DEFAULT_COST_MULTIPLIER,
  });

  const { costPerKilometer, multiplier } = priceInputs;

  const handleChange = (event) => {
    if (!isNaN(event.target.value)) {
      setPriceInputs((state) => ({
        ...state,
        [event.target.name]: +event.target.value,
      }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      document.activeElement.blur();
    }
  };

  const kilometr = totalDistance / 1000;
  const priceCost = Math.round(
    kilometr * costPerKilometer +
      (kilometr * multiplier) / 10 +
      Math.ceil(kilometr / 800) * 1000
  );

  return (
    <Stack spacing={4}>
      <div className="route-info__cost-input-container">
        <label htmlFor="cost-costPerKilometer">Cost per kilometr</label>
        <Input
          id="cost-costPerKilometer"
          type="text"
          name="costPerKilometer"
          variant="flushed"
          value={costPerKilometer}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="route-info__cost-input-container">
        <label htmlFor="cost-multiplyer">Cost multiplyer</label>
        <Input
          id="cost-multiplyer"
          type="text"
          name="multiplier"
          variant="flushed"
          value={multiplier}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <span>{`Total cost: ${priceCost}`}</span>
    </Stack>
  );
};

export default RouteCost;
