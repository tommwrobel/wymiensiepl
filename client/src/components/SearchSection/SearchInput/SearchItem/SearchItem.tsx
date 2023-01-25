import { Box, Typography } from "@mui/material";
import { getAwsS3Url } from "../../../../api/utils/getApiUrl";
import { Book } from "../../../../models/app.models";
import classes from "./SearchItem.module.css";

interface SearchItemProps {
    book: Book;
    key: any;
}

const SearchItem = ({ book, key }: SearchItemProps): JSX.Element => {
    console.log(book);
    return (
        <Box className={classes.itemWrapper} key={key}>
            <Box className={classes.txtContentWrapper}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body1">{book.author}</Typography>
            </Box>
            <Box>
                <img
                    src={getAwsS3Url(book.coverPhoto)}
                    alt=""
                    className={classes.photoCoverImg}
                />
            </Box>
        </Box>
    );
};

export default SearchItem;
