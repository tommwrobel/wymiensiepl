import { Book } from "../../../../models/app.models";
import SearchItem from "../SearchItem/SearchItem";

interface SearchResultsProps {
    books: Book[];
}

const SearchResults = ({ books = [] }: SearchResultsProps): JSX.Element => {
    return (
        <div>
            {books.map((book) => (
                <SearchItem book={book} />
            ))}
        </div>
    );
};

export default SearchResults;
