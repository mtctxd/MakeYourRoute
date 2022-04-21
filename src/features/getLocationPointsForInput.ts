import { LOCATION_BASE_URL } from "../constants";

export const getLocationPointsForInput = async (locationName: string) => {
    const data = await fetch(
      `${LOCATION_BASE_URL}?format=json&limit=3&q=${locationName}`
    );
    const info = await data.json();

    return info;
  };