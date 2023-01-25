import { Book } from "../../../../models/app.models";

interface SearchItemProps {
    book: Book;
}

const SearchItem = ({ book }: SearchItemProps): JSX.Element => {
    return <div>{book.title}</div>;
};

export default SearchItem;
