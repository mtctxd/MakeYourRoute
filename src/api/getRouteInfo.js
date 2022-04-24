import { HERE_ROUTE_CALCULATION } from "../constants";

const getRouteInfo = () => {
    const url = new URL(HERE_ROUTE_CALCULATION);
  const searchParams = {
    transportMode: 'car',
    origin: '50.7450733,25.320078',
    destination: '51.218194499999996,22.554677562145155',
  };

  Object.entries(searchParams).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const data = await fetch(url.toString());
  const info = await data.json();

  return info;
};

export default getRouteInfo;