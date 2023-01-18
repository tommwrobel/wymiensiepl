import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";
import { string } from "yup";
import classes from "./FormModal.module.css";

interface FormModalProps {
    isOpen: boolean;
    onSubmit: () => void;
    submitLabel: string;
    submitLoading?: boolean;
    onClose: () => void;
    title: string;
    errorMessage?: string;
    successMessage?: string;
    formFields: ReactNode;
    footer?: ReactNode;
}

const FormModal = ({
    isOpen,
    onSubmit,
    onClose,
    title,
    errorMessage,
    successMessage,
    formFields,
    footer,
    submitLabel,
    submitLoading = false,
}: FormModalProps): JSX.Element => {
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                <Box className={classes.formFields}>{formFields}</Box>
                <Box className={classes.formActions}>
                    <Button variant="outlined" onClick={onClose}>
                        Anuluj
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={onSubmit}
                        loading={submitLoading}
                    >
                        {submitLabel}
                    </LoadingButton>
                </Box>
                {footer}
            </DialogContent>
        </Dialog>
    );
};

export default FormModal;
