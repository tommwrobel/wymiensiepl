import { createContext, ReactNode, useEffect, useState } from "react";
import { Maybe, Token } from "../models/app.models";
import { User } from "../models/app.models";

export interface AuthContextProps {
    user?: User;
    token?: Token;
    login: (user: User, token: Token) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    login: (user: User, token: Token) => undefined,
    logout: () => undefined,
});

type AuthContextProviderProps = {
    children?: ReactNode;
};

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {
    const [user, setUser] = useState<Maybe<User>>();
    const [token, setToken] = useState<Maybe<Token>>();

    let authLocalStorage = localStorage.getItem("authentication");
    if (authLocalStorage) {
        authLocalStorage = JSON.parse(authLocalStorage);
    }

    useEffect(() => {
        if (authLocalStorage) {
            const auth = authLocalStorage as Pick<
                AuthContextProps,
                "user" | "token"
            >;
            setUser(auth.user);
            setToken(auth.token);
        }
    }, [authLocalStorage]);

    const handleLogin = (user: User, token: Token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem(
            "authentication",
            JSON.stringify({
                user: user,
                token: token,
            })
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("authentication");
        setUser(undefined);
        setToken(undefined);
    };

    return (
        <AuthContext.Provider
            value={{
                user: user,
                token: token,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
