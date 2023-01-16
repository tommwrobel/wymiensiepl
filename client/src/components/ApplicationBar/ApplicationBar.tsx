import {
    AppBar,
    Link,
    Toolbar,
    Container,
    Box,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import classes from "./ApplicationBar.module.css";
import { useState } from "react";
import { theme } from "../../config/theme";
import ApplicationLinks from "./ApplicationLinks/ApplicationLinks";
import SideMenu from "./SideMenu/SideMenu";
import useAppSelector from "../../hooks/useAppSelector";
import { selectAuth } from "../../features/authSlice";

interface ApplicationBarProps {
    openLoginModal: () => void;
    openRegistrationModal: () => void;
}

const ApplicationBar = ({ openLoginModal, openRegistrationModal }: ApplicationBarProps): JSX.Element => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

    const user = useAppSelector(selectAuth);
    const isLoggedUser = () => {
        return Boolean(user.name && user.role && user.token);
    }

    return (
        <AppBar className={classes.mainContainer} position="static">
            <Container maxWidth="lg">
                <Toolbar className={classes.contentContainer}>
                    <Link href="/home">
                        <img
                            src="logo.svg"
                            alt="Wymiensie.pl"
                            className={classes.logo}
                        />
                    </Link>

                    <SideMenu
                        open={isSideMenuOpen && isSmallScreen}
                        onClose={() => setIsSideMenuOpen(false)}
                        openLoginModal={openLoginModal}
                        openRegistrationModal={openRegistrationModal}
                    />

                    <Box className={classes.links}>
                        {!isSmallScreen && (
                            <ApplicationLinks
                                isLoggedUser={isLoggedUser()}
                                numberOfUnreadMessages={0}
                                openLoginModal={openLoginModal}
                                openRegistrationModal={openRegistrationModal}
                            />
                        )}
                        {isSmallScreen && (
                            <IconButton onClick={() => setIsSideMenuOpen(true)}>
                                <MenuIcon color="primary" />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ApplicationBar;
