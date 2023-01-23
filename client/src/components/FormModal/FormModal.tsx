import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";
import classes from "./FormModal.module.css";

interface FormModalProps {
    isOpen: boolean;
    onSubmit: () => void;
    submitLabel: string;
    isLoading?: boolean;
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
    isLoading = false,
}: FormModalProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <LoaderOverlay isLoading={isLoading}>
                <DialogContent dividers>
                    {errorMessage && (
                        <Alert severity="error">{errorMessage}</Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success">{successMessage}</Alert>
                    )}
                    <Box className={classes.formFields}>{formFields}</Box>
                    <Box className={classes.formActions}>
                        <Button variant="outlined" onClick={onClose}>
                            {t("COMMON.CANCEL")}
                        </Button>
                        <Button variant="contained" onClick={onSubmit}>
                            {submitLabel}
                        </Button>
                    </Box>
                    {footer}
                </DialogContent>
            </LoaderOverlay>
        </Dialog>
    );
};

export default FormModal;
