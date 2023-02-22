import {
    AppBar,
    Toolbar,
    Container,
    Box,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import classes from "./ApplicationBar.module.css";
import { useContext, useEffect, useState } from "react";
import { theme } from "../../config/theme";
import ApplicationLinks from "./ApplicationLinks/ApplicationLinks";
import SideMenu from "./SideMenu/SideMenu";
import { AuthContext } from "../../context/AuthContext";
import { useGetNumberOfTransactionsQuery } from "../../api/transactionsApi";
import { Link } from "react-router-dom";

const ApplicationBar = (): JSX.Element => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
    const [numberOfTransactions, setNumberOfTransactions] = useState(0);

    const { user, isLoggedUser } = useContext(AuthContext);

    const numberOfTransactionsQuery = useGetNumberOfTransactionsQuery(
        { userId: user?.id as string },
        { skip: !isLoggedUser }
    );

    useEffect(() => {
      if (numberOfTransactionsQuery.isSuccess && numberOfTransactionsQuery.data) {
        setNumberOfTransactions(numberOfTransactionsQuery.data);
      }
    }, [numberOfTransactionsQuery.data, numberOfTransactionsQuery.isSuccess])
    

    const getApplicationLinks = () => {
        return (
            <ApplicationLinks
                isLoggedUser={isLoggedUser}
                numberOfExchanges={numberOfTransactions}
            />
        );
    };

    return (
        <AppBar className={classes.mainContainer} position="static">
            <Container maxWidth="lg">
                <Toolbar className={classes.contentContainer}>
                    <Link to="/home">
                        <img
                            src="/logo.svg"
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
