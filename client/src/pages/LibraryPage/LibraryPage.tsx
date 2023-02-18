import { Box, Pagination } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLazyGetBooksQuery } from "../../api/booksApi";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import BookList from "../../components/BookList/BookList";
import PageSection from "../../components/PageSection/PageSection";
import PageTitleSection from "../../components/PageTitleSection/PageTitleSection";
import SearchInput from "../../components/SearchInput/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { Book, BooksFilters, Maybe, PageInfo } from "../../models/app.models";

const LibraryPage = (): JSX.Element => {
    const { user } = useContext(AuthContext);
    const { t } = useTranslation();

    const [books, setBooks] = useState<Book[]>([]);
    const [pageInfo, setPageInfo] = useState<Maybe<PageInfo>>();
    const [filters, setFilters] = useState<BooksFilters>({});
    const [totalBooksCount, setTotalBooksCount] = useState(0);

    const [getBooksTrigger, getBooksQuery] = useLazyGetBooksQuery();

    useEffect(() => {
        getBooksTrigger(filters);
    }, [getBooksTrigger, filters]);

    useEffect(() => {
        if (getBooksQuery.isSuccess && getBooksQuery.data) {
            setBooks(getBooksQuery.data.body);
            setTotalBooksCount(getBooksQuery.data.pageInfo.totalElements);
            console.log(getBooksQuery.data.pageInfo);
            setPageInfo(getBooksQuery.data.pageInfo);
        }
    }, [getBooksQuery]);

    const handleApplyFilters = (newFilters: Partial<BooksFilters>) => {
        setFilters((filters) => ({ ...filters, ...newFilters }));
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    const pageTitle = t(
        `PAGES.LIBRARY.${
            filters.searchText ? "SEARCH_RESULTS" : "All_BOOKS"
        }`,
        {
            bookCount: totalBooksCount,
        }
    );

    return (
        <>
            <PageTitleSection
                startContent={pageTitle}
                endContent={
                    <SearchInput
                        onSearch={(searchText) =>
                            handleApplyFilters({ searchText, page: 0 })
                        }
                        onClear={handleClearFilters}
                    />
                }
            />

            <PageSection padding="25px 15px">
                {books && books.length === 0 && <h5>No books</h5>}
                <BookList books={books} />

                <Box display="flex" justifyContent="center" margin={4}>
                    {pageInfo && pageInfo.totalPages > 0 && (
                        <Pagination
                            variant="text"
                            color="primary"
                            disabled={pageInfo.totalPages === 1}
                            count={pageInfo.totalPages}
                            onChange={(_event, page) =>
                                handleApplyFilters({ page: page - 1 })
                            }
                        />
                    )}
                </Box>
            </PageSection>
            <AboutUsSection />
        </>
    );
};

export default LibraryPage;
