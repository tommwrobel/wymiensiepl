import { AuthLocalStorage } from "../context/AuthContext";
import { User } from "../models/app.models";
import { appApi } from "./appApi";

export interface TokenResponse {
    body: string;
    expiresIn: number;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
    token: TokenResponse;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends RegisterResponse {}

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthLocalStorage, RegisterRequest>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            transformResponse: (response: RegisterResponse) => {
                const expirationTime = Date.now() + response.token.expiresIn;
                return {
                    user: response.user,
                    token: {
                        body: response.token.body,
                        expirationTime,
                    },
                };
            },
            invalidatesTags: ["Statistics"],
        }),
        login: builder.mutation<AuthLocalStorage, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            transformResponse: (response: LoginResponse) => {
                const expirationTime = Date.now() + response.token.expiresIn;
                return {
                    user: response.user,
                    token: {
                        body: response.token.body,
                        expirationTime,
                    },
                };
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
