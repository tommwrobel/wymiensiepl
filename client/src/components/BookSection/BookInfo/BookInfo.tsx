import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { customColors } from "../../../config/theme";
import { Book } from "../../../models/app.models";
import classes from "./BookInfo.module.css";

interface Props {
    book: Book;
}

const BookInfo = ({ book }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <Box className={classes.bookInfoWrapper}>
                <Box>
                    <Typography variant="body2" color={customColors.mediumGrey}>
                        {book.author}
                    </Typography>
                    <Typography variant="h3" color={customColors.white}>
                        {book.title}
                    </Typography>
                </Box>
                <Box>
                    <ul className={classes.attributesList}>
                        <li>
                            <Typography
                                variant="body2"
                                color={customColors.mediumGrey}
                            >
                                {t("COMMON.PUBLICATION_YEAR")}:{" "}
                                <span style={{ color: customColors.white }}>
                                    {book.publicationYear || "-"}
                                </span>
                            </Typography>
                        </li>
                        <li>
                        <Typography
                                variant="body2"
                                color={customColors.mediumGrey}
                            >
                                {t("COMMON.NUMBER_OF_PAGES")}:{" "}
                                <span style={{ color: customColors.white }}>
                                    {book.numberOfPages || "-"}
                                </span>
                            </Typography>
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body2" color={customColors.white}>
                        {book.description}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default BookInfo;
