import { Input } from '@chakra-ui/react';
import InputDropdown from './InputDropdown';

const AppInput = ({
  id,
  currentActiveInputId,
  rootEl,
  resetFetchedAdreses,
  index,
  routeInfo,
  inputPlaceholder,
  handleInput,
  handleKeyDown,
  adress,
  fetchedAdreses,
  handleClick,
}) => (
  <div
    ref={currentActiveInputId === id ? rootEl : null}
    className="app__form-input-container"
    onFocusCapture={resetFetchedAdreses}
  >
    <Input
      type="text"
      placeholder={inputPlaceholder(index, routeInfo)}
      value={adress}
      variant="flushed"
      onChange={(event) => handleInput(id, event)}
      onKeyDown={handleKeyDown}
    />
    <InputDropdown
      currentActiveInputId={currentActiveInputId}
      id={id}
      fetchedAdreses={fetchedAdreses}
      adress={adress}
      handleClick={handleClick}
    />
  </div>
);

export default AppInput;
