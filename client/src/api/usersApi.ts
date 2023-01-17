import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { getApiUrl } from "./utils/getApiUrl";

interface RegisterRequestArgs {
    name: string;
    email: string;
    password: string;
}

interface RegisterRequestResponse {
    name: string;
    role: "ADMIN" | "USER";
    token: string;
}

interface LoginRequestArgs {
    email: string;
    password: string;
}

interface LoginRequestResponse {
    name: string;
    role: "ADMIN" | "USER";
    token: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<
            RegisterRequestResponse,
            RegisterRequestArgs
        >({
            query: (body) => ({
                url: "/users",
                method: "GET",
            }),
        }),
        login: builder.mutation<LoginRequestResponse, LoginRequestArgs>({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
    }),
});
