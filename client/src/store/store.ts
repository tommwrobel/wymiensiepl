import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../api/appApi";
import { awsApi } from "../api/awsApi";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [appApi.reducerPath]: appApi.reducer,
        [awsApi.reducerPath]: awsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([appApi.middleware, awsApi.middleware]),
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
