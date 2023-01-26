import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BookResponse, useLazySearchBooksQuery } from "../../api/booksApi";
import PageSection from "../PageSection/PageSection";
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchInput/SearchResults/SearchResults";

interface SearchSectionProps {}

const SearchSection = ({}: SearchSectionProps): JSX.Element => {
    const { t } = useTranslation();

    const [text, setText] = useState("");
    const [books, setBooks] = useState<BookResponse[]>([]);

    const [searchBooks, searchBooksResult] = useLazySearchBooksQuery();

    const deb = useCallback(
        debounce((value) => searchBooks({ text: value }), 200),
        []
    );

    useEffect(() => {
        if (
            searchBooksResult.isSuccess &&
            searchBooksResult.data &&
            text.length > 0
        ) {
            setBooks(searchBooksResult.data);
        }
    }, [searchBooksResult.data, searchBooksResult.isSuccess, text]);

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        if (event.target.value.length > 0) {
            deb(event.target.value);
        } else {
            setBooks([]);
        }
    };

    const [v, setV] = useState(false);

    return (
        <PageSection>
            <Box display="flex" flexDirection="column" minWidth="lg">
                <Grid2 container alignContent="center">
                    <Grid2
                        lg={6}
                        md={8}
                        sm={10}
                        xs={12}
                        mdOffset={2}
                        smOffset={1}
                        xsOffset={0}
                        lgOffset={3}
                    >
                        <SearchInput
                            value={text}
                            onFocus={() => setV(true)}
                            onChange={handleOnSearch}
                            onBlur={() => setV(false)}
                            numberOfResults={books.length}
                        />

                        {v && (
                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    zIndex: 50,
                                }}
                            ></div>
                        )}
                    </Grid2>
                </Grid2>
                {v && <SearchResults books={books} />}
            </Box>
        </PageSection>
    );
};

export default SearchSection;
