import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    location: null,
    input: {
        find: '',
    }
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
            state.input.find = action.payload
        }
    }
});

export const { increment, setLocation, inputHandler } = appSlice.actions;