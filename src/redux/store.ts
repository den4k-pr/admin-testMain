import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./state/togleMenu"
import postReducer from "./state/postSlice"

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        post: postReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
