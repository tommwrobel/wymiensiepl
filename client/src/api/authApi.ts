import { AuthState, User } from "../features/authSlice";
import { appApi } from "./appApi";

interface TokenResponse {
    body: string;
    expiresIn: number;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    user: User;
    token: TokenResponse;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse extends RegisterResponse {}

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthState, RegisterRequest>({
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
        login: builder.mutation<AuthState, LoginRequest>({
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
