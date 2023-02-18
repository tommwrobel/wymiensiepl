import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../models/app.models";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";

export interface ExchangeBookModalProps extends ModalProps {
    bookId?: string;
}

const ExchangeBookModal = ({
    isOpen,
    onClose,
    bookId
}: ExchangeBookModalProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Wymien sie</DialogTitle>
            <LoaderOverlay isLoading={false}>
                <DialogContent dividers>{bookId}</DialogContent>
                <Button onClick={onClose}>{t("COMMON.CLOSE")}</Button>
            </LoaderOverlay>
        </Dialog>
    );
};

export default ExchangeBookModal;
