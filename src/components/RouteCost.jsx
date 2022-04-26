import { useState } from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { DEFAULT_COST_MULTIPLIER, DEFAULT_COST_PER_KILOMETER } from '../constants';

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
    <div className="route-info__cost">
      <Stack spacing={4}>
        <Input
          type="text"
          _placeholder={`Cost per kilometer, default ${DEFAULT_COST_PER_KILOMETER}`}
          name="costPerKilometer"
          variant="flushed"
          value={costPerKilometer}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Cost per kilometr"
        />
        <Input
          type="text"
          _placeholder={`Cost per kilometer, default ${DEFAULT_COST_MULTIPLIER}`}
          name="multiplier"
          variant="flushed"
          value={multiplier}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="price multiplier"
        />
        <span>{priceCost}</span>
      </Stack>
    </div>
  );
};

export default RouteCost;
