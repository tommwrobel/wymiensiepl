import { Box } from "@mui/material";
import { getAwsS3Url } from "../../../../api/utils/getApiUrl";
import { Book } from "../../../../models/app.models";
import classes from "./SearchItem.module.css";

interface SearchItemProps {
    book: Book;
    key: any;
}

const SearchItem = ({ book, key }: SearchItemProps): JSX.Element => {
    const imgUrl = book.coverPhoto ? getAwsS3Url(book.coverPhoto) : "book-img-placeholder.png";

    return (
        <Box className={classes.itemWrapper} key={key}>
            <Box className={classes.txtContentWrapper}>
                <span className={classes.bookTitle}>{book.title}</span>
                <span className={classes.bookAuthor}>{book.author}</span>
            </Box>
            <Box>
                {<img src={imgUrl} alt="" className={classes.photoCoverImg} />}
            </Box>
        </Box>
    );
};

export default SearchItem;
