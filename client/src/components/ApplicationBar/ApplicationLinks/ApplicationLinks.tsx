import { Button, Link } from "@mui/material";
import { removeUser } from "../../../features/authSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";

interface ApplicationLinksProps {
    isLoggedUser?: boolean;
    numberOfUnreadMessages?: number;
    openLoginModal: () => void;
    openRegistrationModal: () => void;
}

const ApplicationLinks = ({
    isLoggedUser,
    numberOfUnreadMessages,
    openLoginModal,
    openRegistrationModal,
}: ApplicationLinksProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(removeUser());
    }

    return (
        <>
            <Link underline="none" href="/home">
                <Button>Strona główna</Button>
            </Link>
            <Link underline="none" href="/home#about">
                <Button>O nas</Button>
            </Link>
            <Link underline="none" href="/profile">
                <Button>Profil</Button>
            </Link>
            {isLoggedUser && (
                <Link underline="none" href="/messages">
                    <Button>Wiadomości ({numberOfUnreadMessages})</Button>
                </Link>
            )}

            {!isLoggedUser && (
                <>
                    
                        <Button onClick={openLoginModal} variant="outlined">Logowanie</Button>
                        <Button onClick={openRegistrationModal} variant="contained">Rejestracja</Button>
                </>
            )}
            {isLoggedUser && (
                <Button variant="outlined" onClick={handleLogout}>Wyloguj</Button>
            )}
        </>
    );
};

export default ApplicationLinks;
