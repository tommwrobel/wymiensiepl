import { ClearOutlined } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { getAwsS3Url } from "../../../api/utils/getApiUrl";
import { shortenText } from "../../../common/utils";
import { customColors } from "../../../config/theme";
import { Book } from "../../../models/app.models";
import classes from "./BookListItem.module.css";

interface BookListItemProps {
    book: Book;
    isCurrentUserBook?: boolean;
    onBookExchange?: () => void;
    onBookDelete?: () => void;
}

const BookListItem = ({
    book,
    isCurrentUserBook,
    onBookExchange,
    onBookDelete,
}: BookListItemProps): JSX.Element => {
    const { t } = useTranslation();
    const coverPhotoSrc = book.coverPhoto
        ? getAwsS3Url() + book.coverPhoto
        : "/book-img-placeholder.png";

    return (
        <Grid className={classes.bookItemContainer} xs={12} md={6}>
            <Grid
                container
                className={classes.bookWrapper}
                padding={2}
                margin={0}
            >
                <img
                    className={classes.coverPhoto}
                    src={coverPhotoSrc}
                    alt={book.title}
                />
                <Grid
                    container
                    className={classes.descriptionWrapper}
                    xs={true}
                    gap={1}
                    flexDirection="column"
                >
                    <Box>
                        <Typography variant="h5">{book.title}</Typography>
                        <Typography
                            variant="body2"
                            className={classes.author}
                            color={customColors.mediumDarkGrey}
                        >
                            {t("COMMON.AUTHOR")}: {book.author}
                        </Typography>
                    </Box>
                    {book.description && (
                        <Typography variant="body2">
                            {shortenText(book.description, 100)}
                        </Typography>
                    )}
                    <Box className={classes.actionsWrapper}>
                        {isCurrentUserBook ? (
                            <Button
                                onClick={onBookDelete}
                                variant="contained"
                                color="error"
                                startIcon={<ClearOutlined />}
                            >
                                {t("COMMON.DELETE")}
                            </Button>
                        ) : (
                            <>
                                <Button variant="contained" onClick={onBookExchange}>
                                    {t("COMMON.EXCHANGE")}
                                </Button>
                                <Link
                                    underline="none"
                                    href={`/books/${book.id}`}
                                >
                                    <Button variant="outlined">
                                        {t("COMMON.MORE_DOTS")}
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BookListItem;
