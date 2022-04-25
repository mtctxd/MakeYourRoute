import {NEAREST_GAS_STANTION} from '../constants'

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
