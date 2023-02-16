import { Box, Typography } from "@mui/material";
import { getAwsS3Url } from "../../../api/utils/getApiUrl";
import { Book } from "../../../models/app.models";

interface BookListItemProps {
    book: Book;
}

const BookListItem = ({ book }: BookListItemProps): JSX.Element => {
    return (
        <>
            <Box border={1}>
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="body2">{book.author} - {book.publicationYear}/{book.numberOfPages}</Typography>
                <Typography variant="body2">{book.description}</Typography>
                {book.coverPhoto && <img src={getAwsS3Url() + book.coverPhoto} />}
            </Box>
        </>
    );
};

export default BookListItem;
