import React from "react";
import { LOCATION_SEARCH_BASE_URL } from "../constants";

export const getLocationPointsForInput = async (locationName, dataSeter, key) => {
  const url = new URL(LOCATION_SEARCH_BASE_URL);
  const searchParams = {
    format: 'json',
    limit: '3',
    q: locationName,
  };

  Object.entries(searchParams).forEach(([key, value]) => (
    url.searchParams.append(key, value)
  ));

    const data = await fetch(url.toString());
    const info = await data.json();

    dataSeter({
        key,
        info,
    });
  };