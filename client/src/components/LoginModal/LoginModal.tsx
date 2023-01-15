import {
  Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { InputField } from "../InputField/InputField";
import classes from "./LoginModal.module.css";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps): JSX.Element => {

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <DialogTitle>Logowanie</DialogTitle>
            <DialogContent dividers>
                <Box className={classes.formFields}>
                  <InputField label="Adres e-mail:" type="email" name="email"/>
                  <InputField label="Hasło:" type="password" name="password"/>
                </Box>
                <Box className={classes.formActions}>
                  <Button variant="outlined" onClick={handleClose}>
                      Anuluj
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                      Zaloguj się
                  </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
