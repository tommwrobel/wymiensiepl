import { Button } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ModalContext } from "../../../context/ModalContext";
import classes from "./ApplicationLinks.module.css";

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

    return (
        <>
            <Link to="/home" className={classes.routerLink}>
                <Button>{t("MENU.HOMEPAGE")}</Button>
            </Link>
            {isLoggedUser && (
                <>
                    <Link to="/library" className={classes.routerLink}>
                        <Button>{t("MENU.LIBRARY")}</Button>
                    </Link>
                    <Link to="/messages" className={classes.routerLink}>
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
                    <Button variant="outlined" onClick={logout}>
                        {t("COMMON.LOGOUT_ACTION")}
                    </Button>
                </>
            )}
        </>
    );
};

export default ApplicationLinks;
