import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { ModalProps } from "../../models/app.models";
import classes from "./MessageModal.module.css";
import { useTranslation } from "react-i18next";

export interface MessageModalProps extends ModalProps{
    closeLabel?: string;
    title?: string;
    text?: string;
    type?: "warning" | "info" | "error",
}

const MessageModal = ({
    isOpen,
    onClose,
    title,
    text,
    closeLabel,
    type = "info",
}: MessageModalProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" textAlign="center">{text}</Typography>
                <Box className={classes.formActions}>
                    <Button variant="contained" onClick={onClose}>
                        {closeLabel || t("COMMON.CLOSE")}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default MessageModal;
