import { createSlice } from "@reduxjs/toolkit";

interface AppStateInterface {
    value: number,
}

const initialState: AppStateInterface = {
    value: 0,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        }
    }
});

export const { increment } = appSlice.actions;