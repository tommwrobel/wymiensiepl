import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl, getLocalStorageToken } from "./utils/getApiUrl";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}`,
        prepareHeaders: (headers) => {
            const token = getLocalStorageToken();
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Statistics", "Books", "Transactions"],
    endpoints: () => ({}),
});
