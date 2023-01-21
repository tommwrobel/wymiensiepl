import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/authApi";
import { booksApi } from "../api/booksApi";
import { filesApi } from "../api/filesApi";
import { statisticsApi } from "../api/statisticsApi";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [statisticsApi.reducerPath]: statisticsApi.reducer,
        [filesApi.reducerPath]: filesApi.reducer,
        [booksApi.reducerPath]: booksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            statisticsApi.middleware,
            filesApi.middleware,
            booksApi.middleware,
        ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
