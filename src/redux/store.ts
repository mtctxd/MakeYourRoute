import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
// import { productApi } from "./productsApi";

const rootReducer = combineReducers({
    appSlice: appSlice.reducer,
    // [productApi.reducerPath]: productApi.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => (
    //     getDefaultMiddleware().concat(productApi.middleware)
    // ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;