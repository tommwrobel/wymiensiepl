import { Button, Link } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../context/AuthContext";
import { ModalContext } from "../../../context/ModalContext";

interface ApplicationLinksProps {
    isLoggedUser?: boolean;
    numberOfUnreadMessages?: number;
}

const ApplicationLinks = ({
    isLoggedUser,
    numberOfUnreadMessages,
}: ApplicationLinksProps): JSX.Element => {
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Link underline="none" href="/home">
                <Button>{t("MENU.HOMEPAGE")}</Button>
            </Link>
            {isLoggedUser && (
                <>
                    <Link underline="none" href="/library">
                        <Button>{t("MENU.LIBRARY")}</Button>
                    </Link>
                    <Link underline="none" href="/messages">
                        <Button>
                            {t("MENU.MESSAGES", {
                                count: numberOfUnreadMessages,
                            })}
                        </Button>
                    </Link>
                </>
            )}

            {!isLoggedUser && (
                <>
                    <Button onClick={() => openModal("LOGIN_MODAL")} variant="outlined">
                        {t("COMMON.LOGIN_ACTION")}
                    </Button>
                    <Button onClick={() => openModal("REGISTER_MODAL")} variant="contained">
                        {t("COMMON.REGISTER_ACTION")}
                    </Button>
                </>
            )}
            {isLoggedUser && (
                <>
                    <Button variant="contained" onClick={() => openModal("ADD_BOOK_MODAL")}>
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
