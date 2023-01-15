import { BaseTextFieldProps, Box, InputLabel, TextField } from "@mui/material";
import classes from "./InputField.module.css";

export const InputField = (props: BaseTextFieldProps): JSX.Element => {
    return (
        <Box className={classes.InputField}>
            <InputLabel>{props.label}</InputLabel>
            <TextField
                size="small"
                variant="outlined"
                type={props.type}
                autoFocus={props.autoFocus}
                fullWidth
            />
        </Box>
    );
};
