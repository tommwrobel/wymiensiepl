import { Button, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { removeAuth } from "../../../features/authSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";

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
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(removeAuth());
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
                <Link underline="none" href="/profile">
                    <Button>{t("MENU.PROFILE")}</Button>
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
