import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Maybe, Token } from "../models/app.models";
import { User } from "../models/app.models";
import { ModalContext } from "./ModalContext";

export interface AuthContextProps {
    user?: User;
    token?: Token;
    isLoggedUser: boolean;
    login: (auth: AuthLocalStorage) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedUser: false,
    login: (auth: AuthLocalStorage) => undefined,
    logout: () => undefined,
});

export interface AuthLocalStorage
    extends Pick<AuthContextProps, "user" | "token"> {}

interface AuthContextProviderProps {
    children?: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {
    const { openModal } = useContext(ModalContext);

    const [user, setUser] = useState<Maybe<User>>();
    const [token, setToken] = useState<Maybe<Token>>();
    const [isLoggedUser, setIsLoggedUser] = useState(false);

    let authLocalStorage = localStorage.getItem("authentication");
    if (authLocalStorage) {
        authLocalStorage = JSON.parse(authLocalStorage);
    }

    const isTokenExpired = (token: Token) => {
        return Date.now() >= token.expirationTime;
    };

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logout();
        }
    });

    useEffect(() => {
        if (authLocalStorage && (!user || !token)) {
            const auth = authLocalStorage as AuthLocalStorage;
            setUser(auth.user);
            setToken(auth.token);
        }
    }, [authLocalStorage, token, user]);

    const login = ({ user, token }: AuthLocalStorage) => {
        setUser(user);
        setToken(token);
        setIsLoggedUser(true);
        localStorage.setItem(
            "authentication",
            JSON.stringify({
                user: user,
                token: token,
            })
        );
    };

    const logout = () => {
        localStorage.removeItem("authentication");
        setUser(undefined);
        setToken(undefined);
        setIsLoggedUser(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoggedUser,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
