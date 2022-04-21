import { createSlice } from "@reduxjs/toolkit";

interface Coords {
    lat: number | null,
    lng: number | null,
}

interface RouteNode {
    text: string,
    coords: Coords
}

interface AppStateInterface {
    value: number,
    location: Coords,
    route: any[]
}

const initialState: AppStateInterface = {
    value: 0,
    location: {
        lat: null,
        lng: null,
    },
    route: ['asd', null]
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        inputHandler: (state, action) => {
            state.route[action.payload.index] = action.payload.text
        },
        addNodeToRoute: state => {
            state.route = [
                ...state.route,
                null
            ];
        },
    }
});

export const { increment, setLocation, inputHandler, addNodeToRoute } = appSlice.actions;