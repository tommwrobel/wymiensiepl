import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { Book } from "../../models/app.models";
import BookListItem from "./BookListItem/BookListItem";

interface BookListProps {
    books: Book[];
}

const BookList = ({ books }: BookListProps): JSX.Element => {
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    return (
        <Grid container spacing={2}>
            {books.map((book) => (
                <BookListItem
                    key={book.id}
                    book={book}
                    isCurrentUserBook={book.userId === user?.id}
                    onBookExchange={() =>
                        openModal("EXCHANGE_BOOK_MODAL", {
                            bookId: book.id,
                        })
                    }
                />
            ))}
        </Grid>
    );
};

export default BookList;
