import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export interface Coords {
  lat: number | undefined;
  lng: number | undefined;
}

export interface RouteInput {
  [key: string]: {
    adressName: string;
    coords: Coords;
  };
}

interface AppStateInterface {
  location: {
    lat: number,
    lng: number,
  };
  routeInput: RouteInput;
}

const initialState: AppStateInterface = {
  location: {
    lat: 51,
    lng: 51,
  },
  routeInput: {
    [uuid()]: {
      adressName: '',
      coords: {
        lat: undefined,
        lng: undefined,
      },
    },
    [uuid()]: {
      adressName: '',
      coords: {
        lat: undefined,
        lng: undefined,
      },
    },
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    inputHandler: (state, action) => {
      const { key, text } = action.payload;
      state.routeInput[key].adressName = text;
    },
    addNodeToRouteInput: (state) => {
      const arrayFromRouteInputObject = Object.entries(state.routeInput);

      if (
        arrayFromRouteInputObject.every(
          (item) => item[1].coords.lat && item[1].coords.lng
        )
      ) {
        state.routeInput = {
          ...state.routeInput,
          [uuid()]: {
            adressName: '',
            coords: {
              lat: undefined,
              lng: undefined,
            },
          },
        };
      }
    },
    addCoordinatesOnOnClick: (state, action) => {
      const {
        item: { display_name, lat, lon },
        key,
      } = action.payload;

      state.routeInput[key] = {
        adressName: display_name,
        coords: { lat, lng: lon },
      };
    },
    addCoordinatesOnOnEnter: (_state, action) => {
      addCoordinatesOnOnClick(action);
    },
  },
});

export const {
  setLocation,
  inputHandler,
  addNodeToRouteInput,
  addCoordinatesOnOnClick,
  addCoordinatesOnOnEnter,
} = appSlice.actions;
