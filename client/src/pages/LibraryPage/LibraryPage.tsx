import { Box, Button, Pagination } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useLazyGetBooksQuery } from "../../api/booksApi";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import BookList from "../../components/BookList/BookList";
import Footer from "../../components/Footer/Footer";
import SearchBarSection from "../../components/SearchBarSection/SearchBarSection";
import { AuthContext } from "../../context/AuthContext";
import { Book, BooksFilter, Maybe, PageInfo } from "../../models/app.models";

const LibraryPage = (): JSX.Element => {
    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState<Book[]>([]);
    const [pageInfo, setPageInfo] = useState<Maybe<PageInfo>>();
    const [searchTxt, setSearchTxt] = useState<Maybe<string>>();
    const [filters, setFilters] = useState<Maybe<BooksFilter>>();

    const [getBooksTrigger, getBooksQuery] = useLazyGetBooksQuery();

    useEffect(() => {
        getBooksTrigger({});
    }, [getBooksTrigger]);

    useEffect(() => {
        if (getBooksQuery.isSuccess && getBooksQuery.data) {
            setBooks(getBooksQuery.data.body);
            setPageInfo(getBooksQuery.data.pageInfo);
        }
    }, [getBooksQuery]);

    const handleApplyFilters = () => {
        setFilters({ text: searchTxt });
        getBooksTrigger({ searchTxt: searchTxt });
    };

    return (
        <>
        <SearchBarSection />
            Search:
            <input
                type="text"
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
            />
            <Button onClick={handleApplyFilters}>Szukaj</Button>
            {books && books.length === 0 && <h5>No books</h5>}
            <Box padding={10}>
                <BookList books={books} />
            </Box>
            {pageInfo && pageInfo.totalPages > 0 && (
                <Pagination
                    variant="text"
                    disabled={pageInfo.totalPages === 1}
                    count={pageInfo.totalPages}
                    onChange={(event, page) =>
                        getBooksTrigger({
                            searchTxt: filters?.text,
                            page: page - 1,
                        })
                    }
                />
            )}
            <AboutUsSection />
            <Footer />
        </>
    );
};

export default LibraryPage;
