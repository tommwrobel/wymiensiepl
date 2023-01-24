import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { getApiUrl } from "./utils/getApiUrl";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                headers.set("authorization", `Bearer ${token.body}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Statistics'],
    endpoints: () => ({}),
});
