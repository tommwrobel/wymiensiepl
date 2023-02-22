import Grid from "@mui/material/Unstable_Grid2";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDeleteBookMutation } from "../../api/booksApi";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { Book } from "../../models/app.models";
import { ExchangeBookModalProps } from "../ExchangeBookModal/ExchangeBookModal";
import BookListItem from "./BookListItem/BookListItem";

interface BookListProps {
    books: Book[];
}

const BookList = ({ books }: BookListProps): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);
    const [deleteBook, deleteBookMutation] = useDeleteBookMutation();

    useEffect(() => {
        if (deleteBookMutation.isSuccess) {
            toast.success(t("COMMON.DELETE_BOOK_SUCCESS"));
            deleteBookMutation.reset();
        }

        if (deleteBookMutation.isError) {
            toast.error(t("COMMON.DELETE_BOOK_ERROR"));
            deleteBookMutation.reset();
        }
    });

    return (
        <Grid container spacing={2}>
            {books.map((book) => (
                <BookListItem
                    key={book.id}
                    book={book}
                    isCurrentUserBook={book.userId === user?.id}
                    onBookExchange={() =>
                        openModal<ExchangeBookModalProps>("EXCHANGE_BOOK_MODAL", {
                            bookId: book.id,
                        })
                    }
                    onBookDelete={() => deleteBook({ bookId: book.id })}
                />
            ))}
        </Grid>
    );
};

export default BookList;
