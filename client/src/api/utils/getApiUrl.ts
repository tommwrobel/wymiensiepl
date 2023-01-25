import { AuthLocalStorage } from "../../context/AuthContext";

export const getApiUrl = () => process.env.REACT_APP_API_URL;

export const getLocalStorageToken = () => {
    const authLocalStorage = localStorage.getItem("authentication");
    if (authLocalStorage) {
        return (JSON.parse(authLocalStorage) as AuthLocalStorage)?.token?.body;
    }
    return undefined;
};
