import {NEAREST_GAS_STANTION} from '../constants'

// 1Cy84Av4alPTbM8FCeVhgrfR8Q4jX3OHhHrcxYPi

const getAdreses = async (coords) => {
  const url = new URL(NEAREST_GAS_STANTION);
  const searchParams = {
    format: 'json',
    limit: '3',
    q: adressString,
  };

  Object.entries(searchParams).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const data = await fetch(url.toString());
  const info = await data.json();

  return info;
};

export default getAdreses;
