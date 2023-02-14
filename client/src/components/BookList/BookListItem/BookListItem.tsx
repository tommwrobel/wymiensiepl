import { Box, Typography } from "@mui/material";
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
            </Box>
        </>
    );
};

export default BookListItem;
