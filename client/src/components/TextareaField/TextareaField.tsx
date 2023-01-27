import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import classes from "./TextareaField.module.css";

const TextareaField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref): JSX.Element => {
        return (
            <Box className={classes.inputContainer}>
                <InputLabel>{props.label}:</InputLabel>
                <TextField
                    {...props}
                    inputRef={ref}
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
    }
);

export default TextareaField;
