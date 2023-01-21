import { Box, Drawer } from "@mui/material";
import { ReactNode } from "react";
import classes from "./SideMenu.module.css";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    content: ReactNode;
}

const SideMenu = ({
    open,
    onClose,
    content,
}: SideMenuProps): JSX.Element => {
    return (
        <Drawer open={open} anchor="right" onClose={onClose} onClick={onClose}>
            <Box className={classes.sideMenuContent}>
                {content}
            </Box>
        </Drawer>
    );
};

export default SideMenu;
