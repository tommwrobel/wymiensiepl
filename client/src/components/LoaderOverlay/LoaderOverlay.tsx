import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import classes from "./LoaderOverlay.module.css";

interface LoaderOverlayProps {
    isLoading?: boolean;
    children: ReactNode;
}

const LoaderOverlay = ({
    isLoading,
    children,
}: LoaderOverlayProps): JSX.Element => {
    return isLoading ? (
        <div>
            <div className={classes.loaderIndicatorWrapper}>
                <CircularProgress size={60} />
            </div>
            <div className={classes.loaderWrapper}>{children}</div>
        </div>
    ) : (
        <>{children}</>
    );
};

export default LoaderOverlay;
