import { Box, Drawer } from "@mui/material";
import ApplicationLinks from "../ApplicationLinks/ApplicationLinks";
import classes from "./SideMenu.module.css";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    openLoginModal: () => void;
    openRegistrationModal: () => void;
}

const SideMenu = ({
    open,
    onClose,
    openLoginModal,
    openRegistrationModal,
}: SideMenuProps): JSX.Element => {
    return (
        <Drawer open={open} anchor="right" onClose={onClose} onClick={onClose}>
            <Box className={classes.sideMenuContent}>
                <ApplicationLinks
                    openLoginModal={openLoginModal}
                    openRegistrationModal={openRegistrationModal}
                />
            </Box>
        </Drawer>
    );
};

export default SideMenu;
