import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import classes from "./InputField.module.css";

export const InputField = (props: TextFieldProps): JSX.Element => {
    return (
        <Box className={classes.inputContainer}>
            <InputLabel>{props.label}:</InputLabel>
            <TextField
                {...props}
                size="small"
                variant="outlined"
                label={undefined}
                fullWidth
            />
        </Box>
    );
};
