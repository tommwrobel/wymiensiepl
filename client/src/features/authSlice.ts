import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type UserRole = "ADMIN" | "USER";
export interface User {
    id: string,
    name: string,
    email: string,
    role: UserRole,
}
export interface Token {
    body: string,
    expirationTime: number,
}
export interface AuthState {
    user: User | null,
    token: Token | null,
}

const initialState: AuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            localStorage.setItem(
                "authentication",
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                })
            );
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        removeAuth: (state) => {
          localStorage.removeItem("authentication");
          state.user = null;
          state.token = null;
        }
    },
    
});

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsLoggedUser = (state: RootState) => Boolean(state.auth.user && state.auth.token);

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
