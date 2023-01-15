import { Box, Drawer } from "@mui/material";
import ApplicationLinks from "../ApplicationLinks/ApplicationLinks";
import classes from "./SideMenu.module.css";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    openLoginModal: () => void;
}

const SideMenu = ({open, onClose, openLoginModal}: SideMenuProps): JSX.Element => {
    return (
        <Drawer
            open={open}
            anchor="right"
            onClose={onClose}
            onClick={onClose}
        >
            <Box className={classes.sideMenuContent}>
                <ApplicationLinks openLoginModal={openLoginModal}/>
            </Box>
        </Drawer>
    );
}

export default SideMenu;
