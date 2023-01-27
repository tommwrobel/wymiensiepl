import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import classes from "./InputField.module.css";

const InputField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref): JSX.Element => {
        return (
            <Box className={classes.inputContainer}>
                {props.label && (
                    <InputLabel>
                        {props.label}:{props.required && "*"}
                    </InputLabel>
                )}
                <TextField
                    {...props}
                    inputRef={ref}
                    size="small"
                    variant="outlined"
                    label={undefined}
                    fullWidth
                />
            </Box>
        );
    }
);

export default InputField;
