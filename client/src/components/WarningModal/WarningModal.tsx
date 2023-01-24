import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import classes from "./WarningModal.module.css";

interface WarningModalProps {
    isOpen: boolean;
    closeLabel: string;
    onClose: () => void;
    title: string;
    text: string;
}

const WarningModal = ({
    isOpen,
    onClose,
    title,
    text,
    closeLabel,
}: WarningModalProps): JSX.Element => {

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

export default WarningModal;
