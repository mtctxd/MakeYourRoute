import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

interface Coords {
  lat: number | null;
  lng: number | null;
}

interface AppStateInterface {
  location: Coords;
  routeInput: {
    [key: number]: {
      adressName: string;
      coords: Coords;
    };
  };
}

const initialState: AppStateInterface = {
  location: {
    lat: null,
    lng: null,
  },
  routeInput: {
    [uuid()]: {
      adressName: '',
      coords: {
        lat: null,
        lng: null,
      },
    },
    [uuid()]: {
      adressName: '',
      coords: {
        lat: null,
        lng: null,
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
              lat: null,
              lng: null,
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
