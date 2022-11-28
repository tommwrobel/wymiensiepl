import { Box, Drawer } from "@mui/material";
import ApplicationLinks from "../ApplicationLinks/ApplicationLinks";
import classes from "./SideMenu.module.css";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

const SideMenu = ({open, onClose}: SideMenuProps): JSX.Element => {
    return (
        <Drawer
            open={open}
            anchor="right"
            onClose={onClose}
            onClick={onClose}
        >
            <Box className={classes.sideMenuContent}>
                <ApplicationLinks />
            </Box>
        </Drawer>
    );
}

export default SideMenu;
