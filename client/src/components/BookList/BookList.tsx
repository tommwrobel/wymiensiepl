import { Book } from "../../models/app.models";
import BookListItem from "./BookListItem/BookListItem";

interface BookListProps {
    books: Book[];
}

const BookList = ({ books }: BookListProps): JSX.Element => {
    return (
        <>
            {books.map((book) => (
                <BookListItem key={book.id} book={book} />
            ))}
        </>
    );
};

export default BookList;
