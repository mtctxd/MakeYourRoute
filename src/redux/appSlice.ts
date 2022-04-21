import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuid} from 'uuid';

interface Coords {
    lat: number | null,
    lng: number | null,
}

interface AppStateInterface {
    location: Coords,
    routeInput: {
        [key: number]: string
    }
}

const initialState: AppStateInterface = {
    location: {
        lat: null,
        lng: null,
    },
    routeInput: {
        [uuid()]: '',
        [uuid()]: ''
    },
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        inputHandler: (state, action) => {
            state.routeInput = {
                ...state.routeInput,
                [action.payload.index]: action.payload.text,
            }
        },
        addNodeToRouteInput: state => {
            const arrayFromRouteInputObject = Object.values(state.routeInput);
            if (arrayFromRouteInputObject.every(item => item)) {
                state.routeInput = {
                    ...state.routeInput,
                    [uuid()]: ''
                }
            }
        },
    }
});

export const { setLocation, inputHandler, addNodeToRouteInput } = appSlice.actions;