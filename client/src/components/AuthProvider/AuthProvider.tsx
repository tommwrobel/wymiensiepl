import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import { Token } from "../../features/authSlice";
import WarningModal from "../WarningModal/WarningModal";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleCloseWarningModal = () => {
        setIsWarningModalOpen(false);
    };

    const isTokenExpired = (token: Token) => {
        return Date.now() >= token.expirationTime;
    };

    useEffect(() => {
        if (authContext.token && isTokenExpired(authContext.token)) {
            authContext.logout();
            setIsWarningModalOpen(true);
        }
    }, [authContext]);

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
