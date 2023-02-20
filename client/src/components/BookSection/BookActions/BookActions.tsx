import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { userApi } from "../../../api/usersApi";
import { customColors } from "../../../config/theme";
import { ModalContext } from "../../../context/ModalContext";
import { User } from "../../../models/app.models";
import classes from "./BookActions.module.css";

interface Props {
    user: User;
    bookId: string;
}

const BookActions = ({ user, bookId }: Props): JSX.Element => {
    const { t } = useTranslation();
    const { openModal } = useContext(ModalContext);

    return (
        <Box className={classes.actionsWrapper}>
            <Typography
                variant="body2"
                color={customColors.mediumGrey}
                textAlign="center"
            >
                {t("COMMON.ONE_OF_USER_1")}{" "}
                <span style={{ color: customColors.white }}>{user.name}</span>.{" "}
                {t("COMMON.ONE_OF_USER_2")}
            </Typography>
            <Box className={classes.buttonsWrapper}>
                <Button
                    variant="contained"
                    onClick={() => openModal("EXCHANGE_BOOK_MODAL", { bookId })}
                >
                    {t("COMMON.EXCHANGE")}
                </Button>
                <Link to={`/${user.id}/books`}>
                    <Button variant="outlined">
                        {t("COMMON.SEE_USER_BOOKS")}
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default BookActions;
