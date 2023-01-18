import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import classes from "./TextareaField.module.css";

const TextareaField = (props: TextFieldProps): JSX.Element => {
    return (
        <Box className={classes.inputContainer}>
            <InputLabel>{props.label}:</InputLabel>
            <TextField
                {...props}
                size="small"
                variant="outlined"
                label={undefined}
                minRows={3}
                maxRows={props.maxRows || 5}
                multiline
                fullWidth
            />
        </Box>
    );
};

export default TextareaField;
