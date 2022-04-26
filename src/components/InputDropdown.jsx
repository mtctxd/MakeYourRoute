const InputDropdown = ({
  fetchedAdreses,
  currentActiveInputId,
  id,handleClick
}) => {
  if (fetchedAdreses && currentActiveInputId === id) {
    return (
      <div className="app__form-input-dropdown">
        {fetchedAdreses.map((adress) => (
          <div
            className="app__form-input-dropdown-item"
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
