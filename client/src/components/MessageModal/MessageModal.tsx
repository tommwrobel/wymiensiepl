import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import classes from "./MessageModal.module.css";

interface MessageModalProps {
    isOpen: boolean;
    closeLabel: string;
    onClose: () => void;
    title: string;
    text: string;
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
                        {closeLabel}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default MessageModal;
