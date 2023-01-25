import { Button, Link } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../context/AuthContext";

interface ApplicationLinksProps {
    isLoggedUser?: boolean;
    numberOfUnreadMessages?: number;
    openLoginModal: () => void;
    openRegistrationModal: () => void;
    openAddBookModal: () => void;
}

const ApplicationLinks = ({
    isLoggedUser,
    numberOfUnreadMessages,
    openLoginModal,
    openRegistrationModal,
    openAddBookModal,
}: ApplicationLinksProps): JSX.Element => {
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Link underline="none" href="/home">
                <Button>{t("MENU.HOMEPAGE")}</Button>
            </Link>
            <Link underline="none" href="/home#aboutUs">
                <Button>{t("MENU.ABOUT_US")}</Button>
            </Link>
            {isLoggedUser && (
                <>
                <Link underline="none" href="/mylibrary">
                    <Button>{t("MENU.MY_LIBRARY")}</Button>
                </Link>
                <Link underline="none" href="/messages">
                    <Button>
                        {t("MENU.MESSAGES", { count: numberOfUnreadMessages })}
                    </Button>
                </Link>
                </>
            )}

            {!isLoggedUser && (
                <>
                    <Button onClick={openLoginModal} variant="outlined">
                        {t("COMMON.LOGIN_ACTION")}
                    </Button>
                    <Button onClick={openRegistrationModal} variant="contained">
                        {t("COMMON.REGISTER_ACTION")}
                    </Button>
                </>
            )}
            {isLoggedUser && (
                <>
                    <Button variant="contained" onClick={openAddBookModal}>
                        {t("COMMON.ADD_BOOK_ACTION")}
                    </Button>
                    <Button variant="outlined" onClick={handleLogout}>
                        {t("COMMON.LOGOUT_ACTION")}
                    </Button>
                </>
            )}
        </>
    );
};

export default ApplicationLinks;
