import { Button, Link } from "@mui/material";

interface ApplicationLinksProps {
    isLoggedUser?: boolean;
    numberOfUnreadMessages?: number;
    openLoginModal: () => void;
}

const ApplicationLinks = ({
    isLoggedUser,
    numberOfUnreadMessages,
    openLoginModal,
}: ApplicationLinksProps): JSX.Element => {
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
                        <Button variant="contained">Rejestracja</Button>
                </>
            )}
            {isLoggedUser && (
                <Link underline="none" href="/logout">
                    <Button variant="outlined">Wyloguj</Button>
                </Link>
            )}
        </>
    );
};

export default ApplicationLinks;
