import { createSlice } from "@reduxjs/toolkit";

interface AppStateInterface {
    value: number,
    location: any
}

const initialState: AppStateInterface = {
    value: 0,
    location: null,
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
        }
    }
});

export const { increment, setLocation } = appSlice.actions;