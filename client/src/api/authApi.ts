import { AuthState, User } from "../features/authSlice";
import { appApi } from "./appApi";

interface TokenResponse {
    body: string;
    expiresIn: number;
}

interface RegisterRequestArgs {
    name: string;
    email: string;
    password: string;
}

interface AuthRequestResponse {
    user: User;
    token: TokenResponse;
}

interface LoginRequestArgs {
    email: string;
    password: string;
}

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthState, RegisterRequestArgs>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            transformResponse: (response: AuthRequestResponse) => {
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
        login: builder.mutation<AuthState, LoginRequestArgs>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            transformResponse: (response: AuthRequestResponse) => {
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
