import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "../utils/getApiUrl";

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

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}/auth`,
        headers: {
            "Content-type": "application/json",
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<
            RegisterRequestResponse,
            RegisterRequestArgs
        >({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
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

export const { useRegisterMutation, useLoginMutation } = authApi;
