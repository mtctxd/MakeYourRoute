import { LOCATION_SEARCH_BASE_URL } from '../constants';

const getAdreses = async (adressString) => {
  const url = new URL(LOCATION_SEARCH_BASE_URL);
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
