import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import classes from "./InstructionItem.module.css";
import commonClasses from "../../../common/App.module.css";

interface InstructionItemProps {
    number: number;
    text: string;
}

const InstructionItem = ({number, text}: InstructionItemProps): JSX.Element => {
    return (
        <Grid2 xs={12} sm={6} md={3} className={classes.instructionItemContainer}>
            <Box className={classes.instructionItemBox}>
                <Typography variant="h2" textAlign="center"><span className={commonClasses.primaryColorBolderText}>{number}.</span></Typography>
                <Typography variant="subtitle1" textAlign="center">{text}</Typography>
            </Box>
        </Grid2>
    );
}

export default InstructionItem;
