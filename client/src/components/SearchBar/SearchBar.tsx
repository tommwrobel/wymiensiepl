import { SearchOffOutlined, SearchRounded } from "@mui/icons-material";
import {
    Box,
    Chip,
    CircularProgress,
    Input,
    InputAdornment,
    Popover,
    TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BookResponse, useLazySearchBooksQuery } from "../../api/booksApi";
import PageSection from "../PageSection/PageSection";

interface SearchBarProps {}

const SearchBar = ({}: SearchBarProps): JSX.Element => {
    const { t } = useTranslation();

    const [text, setText] = useState("");
    const [books, setBooks] = useState<BookResponse[]>([]);

    const [searchBooks, searchBooksResult] = useLazySearchBooksQuery();

    const deb = useCallback(
        debounce((value) => searchBooks({ text: value }), 200),
        []
    );

    useEffect(() => {
        if (searchBooksResult.isSuccess && searchBooksResult.data) {
            setBooks(searchBooksResult.data);
        }
    }, [searchBooksResult.data, searchBooksResult.isSuccess]);

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        if (event.target.value.length > 1) deb(event.target.value);
    };

    const [backdrop, setBackgrop] = useState(false);

    return (
        <PageSection>
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
                  <div style={{zIndex: 999}}>
                    <TextField
                        size="medium"
                        variant="outlined"
                        value={text}
                        onFocus={() => setBackgrop(true)}
                        onBlur={() => {setBackgrop(false); setBooks([]); setText("")}}
                        onChange={handleOnSearch}
                        placeholder={t("COMMON.SEARCH_BOOKS_ACTION").toString()}
                        InputProps={{
                            notched: false,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Chip
                                        size="small"
                                        color="default"
                                        label={books.length}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        style={{zIndex: 999}}
                    />
                    </div>
                </Grid2>
            </Grid2>
            {backdrop && books.length > 0  && <div
                style={{
                    width: "520px",
                    borderRadius: 12,
                    padding: 30,
                    backgroundColor: "white",
                    position: "absolute",
                    top: 225,
                    left: "50%",
                    zIndex: 52,
                    translate: "-50% 0",
                }}
            >
              
              
                {books.map(book => <div style={{padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "solid 1px #eee"}}>
                  <div style={{display: "flex", flexDirection: "column", gap: 4}}>
                    <b>{book.title}</b>
                    <i>{book.author}</i>
                  </div>
                  {book.coverPhoto && <img width={50} height={50} src={process.env.REACT_APP_AWS_IMG_URL + book.coverPhoto} alt="no img" />}
              </div>)}
                </div>}
            {backdrop && <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 50,
                }}
            >
                
            </div>}
        </PageSection>
    );
};

export default SearchBar;
