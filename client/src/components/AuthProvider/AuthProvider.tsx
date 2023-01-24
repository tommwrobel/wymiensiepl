import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeAuth, setAuth, Token } from "../../features/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import WarningModal from "../WarningModal/WarningModal";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const auth = JSON.parse(localStorage.getItem("authentication") || "{}");
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleCloseWarningModal = () => {
        setIsWarningModalOpen(false);
    };

    const isTokenExpired = (token: Token) => {
        return Date.now() >= token.expirationTime;
    };

    useEffect(() => {
        dispatch(setAuth(auth));
    }, [dispatch, auth]);

    useEffect(() => {
        if (auth && auth.token && isTokenExpired(auth.token)) {
            dispatch(removeAuth());
            setIsWarningModalOpen(true);
        }
    }, [auth, dispatch]);

    return (
        <>
            {children}
            <WarningModal
                title={t("COMMON.TOKEN_EXPIRED_TITLE")}
                isOpen={isWarningModalOpen}
                onClose={handleCloseWarningModal}
                text={t("COMMON.TOKEN_EXPIRED")}
                closeLabel={t("COMMON.CLOSE")}
            />
        </>
    );
};

export default AuthProvider;
