import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";
import classes from "./FormModal.module.css";

interface FormModalProps {
    isOpen: boolean;
    onSubmit: () => void;
    submitActionLabel: string;
    submitActionLoading?: boolean;
    onClose: () => void;
    title: string;
    formFields: ReactNode;
    footer?: ReactNode;
}

const FormModal = ({
    isOpen,
    onSubmit,
    onClose,
    title,
    formFields,
    footer,
    submitActionLabel,
    submitActionLoading = false,
}: FormModalProps): JSX.Element => {
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <Box className={classes.formFields}>{formFields}</Box>
                <Box className={classes.formActions}>
                    <Button variant="outlined" onClick={onClose}>
                        Anuluj
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={onSubmit}
                        loading={submitActionLoading}
                    >
                        {submitActionLabel}
                    </LoadingButton>
                </Box>
                {footer}
            </DialogContent>
        </Dialog>
    );
};

export default FormModal;
