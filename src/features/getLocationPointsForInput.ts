import React from "react";
import { LOCATION_BASE_URL } from "../constants";

export const getLocationPointsForInput = async (locationName: string, dataSeter: any, key: string) => {
    const data = await fetch(
      `${LOCATION_BASE_URL}?format=json&limit=3&q=${locationName}`
    );
    const info = await data.json();
    dataSeter({
        key,
        info,
    });
  };