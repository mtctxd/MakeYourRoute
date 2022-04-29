import { Button, Stack } from '@chakra-ui/react';
import generatePDF from '../features/generatePDF';
import validDateString from '../features/validDateString';

const RouteInscructions = ({ routeSummary }) => {
  const {
    name,
    summary: { totalDistance, totalTime },
    instructions,
  } = routeSummary;

  return (
    <div>
      <Stack Stack spacing={4}>
        <Button colorScheme="blue" onClick={() => generatePDF('instructions')}>
          Get instructions in PFD
        </Button>

        <div className="route-info__instructions" id="instructions">
          <div className="route-info__header">
            <div>{`Road name: ${name}`}</div>
            <div>{`Distance: ${Math.round(totalDistance / 10) / 100} km`}</div>
            <div>{`Estimated time spent: ${validDateString(totalTime)}`}</div>
          </div>
          <ul className="route-info__instructions-list" id="app">
            {instructions.map((instruction) => (
              <li
                className="route-info__instruction-list-item"
                key={instruction.text + instruction.distance}
              >
                <div>{instruction.text}</div>
                <div>{`${Math.round(instruction.distance)}m`}</div>
              </li>
            ))}
          </ul>
        </div>
      </Stack>
    </div>
  );
};

export default RouteInscructions;
