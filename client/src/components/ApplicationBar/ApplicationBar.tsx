import { Button } from "@mui/material";
import classes from "./ApplicationBar.module.css";

interface ApplicationBarProps {
    title: string;
}

const ApplicationBar = ({ title }: ApplicationBarProps): JSX.Element => {
    return (
        <>
            <Button className={classes.button}>Sample button</Button>
        </>
    );
};

export default ApplicationBar;
