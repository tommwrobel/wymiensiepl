import { Box, CircularProgress } from "@mui/material";
import { Book } from "../../../../models/app.models";
import SearchItem from "../SearchItem/SearchItem";
import classes from "./SearchResults.module.css";

interface SearchResultsProps {
    books: Book[];
    isLoading?: boolean;
}

const SearchResults = ({
    books = [],
    isLoading,
}: SearchResultsProps): JSX.Element => {
    if (books.length === 0) return <></>;

    return (
        <Box maxWidth="sm" className={classes.boxWrapper}>
            <Box className={classes.searchResultsWrapper}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    books.map((book) => (
                        <SearchItem book={book} key={book.id} />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default SearchResults;
