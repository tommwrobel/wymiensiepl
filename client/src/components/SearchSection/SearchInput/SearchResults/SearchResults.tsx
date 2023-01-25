import { Box } from "@mui/material";
import { Book } from "../../../../models/app.models";
import SearchItem from "../SearchItem/SearchItem";
import classes from "./SearchResults.module.css";

interface SearchResultsProps {
    books: Book[];
}

const SearchResults = ({ books = [] }: SearchResultsProps): JSX.Element => {
    return (
      <Box maxWidth="sm"  className={classes.boxWrapper}>
        <Box maxWidth="sm" className={classes.searchResultsWrapper}>
            {books.map((book) => (
                <SearchItem book={book} key={book.id} />
            ))}
        </Box>
        </Box>
    );
};

export default SearchResults;
