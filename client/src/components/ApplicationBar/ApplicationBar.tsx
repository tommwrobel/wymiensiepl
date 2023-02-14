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
import { useContext, useState } from "react";
import { theme } from "../../config/theme";
import ApplicationLinks from "./ApplicationLinks/ApplicationLinks";
import SideMenu from "./SideMenu/SideMenu";
import { AuthContext } from "../../context/AuthContext";

const ApplicationBar = (): JSX.Element => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

    const { isLoggedUser } = useContext(AuthContext);

    const getApplicationLinks = () => {
        return (
            <ApplicationLinks
                isLoggedUser={isLoggedUser()}
                numberOfUnreadMessages={0}
            />
        );
    };

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
                        content={getApplicationLinks()}
                    />

                    <Box className={classes.links}>
                        {!isSmallScreen && getApplicationLinks()}
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
