import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useCreateTransactionMutation } from "../../api/transactionsApi";
import useServerError from "../../hooks/useServerError";
import { ModalProps } from "../../models/app.models";
import AppModal from "../AppModal/AppModal";

export interface ExchangeBookModalProps extends ModalProps {
    bookId?: string;
}

const ExchangeBookModal = ({
    isOpen,
    onClose,
    bookId,
}: ExchangeBookModalProps): JSX.Element => {
    const { t } = useTranslation();

    const [exchangeBook, exchangeBookStatus] = useCreateTransactionMutation();
    const [errorMessage, ] = useServerError(exchangeBookStatus);

    useEffect(() => {
        if (exchangeBookStatus.isSuccess) {
            toast.success(t("EXCHANGE.PROPOSAL_SUCCESS_MESSAGE"));
            onClose();
        }
    }, [exchangeBookStatus.isSuccess, onClose, t]);

    return (
        <AppModal
            onSubmit={() => exchangeBook({ bookId: bookId as string })}
            isOpen={isOpen}
            errorMessage={
                errorMessage
                    ? t(errorMessage).toString()
                    : undefined
            }
            isLoading={exchangeBookStatus.isLoading}
            submitLabel={t("EXCHANGE.SUBMIT")}
            onClose={onClose}
            title={t("EXCHANGE.MODAL_TITLE")}
            content={
                <>
                    <Typography variant="body2" textAlign="center">
                        {t("EXCHANGE.MODAL_TEXT_1")}
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                        {t("EXCHANGE.MODAL_TEXT_2")}
                    </Typography>
                </>
            }
        />
    );
};

export default ExchangeBookModal;
