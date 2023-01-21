import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import classes from "./InputField.module.css";

const InputField = (props: TextFieldProps): JSX.Element => {
    return (
        <Box className={classes.inputContainer}>
            {props.label && <InputLabel>{props.label}:{props.required && "*"}</InputLabel>}
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

export default InputField;
