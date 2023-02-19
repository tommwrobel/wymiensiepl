import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useLazyGetBooksQuery } from "../../api/booksApi";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import BookList from "../../components/BookList/BookList";
import PageSection from "../../components/PageSection/PageSection";
import PageTitleSection from "../../components/PageTitleSection/PageTitleSection";
import SearchInput from "../../components/SearchInput/SearchInput";
import {
    Book,
    BooksFilters,
    FilterName,
    Maybe,
    PageInfo,
} from "../../models/app.models";

const UserLibraryPage = (): JSX.Element => {
    const { t } = useTranslation();

    const { userId } = useParams();

    const [books, setBooks] = useState<Book[]>([]);
    const [pageInfo, setPageInfo] = useState<Maybe<PageInfo>>();
    const [filters, setFilters] = useState<BooksFilters>({ userId });
    const [bookCount, setBooksCount] = useState<Maybe<number>>(0);

    const [getBooksTrigger, getBooksQuery] = useLazyGetBooksQuery();

    useEffect(() => {
        getBooksTrigger(filters);
    }, [getBooksTrigger, filters]);

    useEffect(() => {
        if (
            getBooksQuery.isSuccess &&
            getBooksQuery.data &&
            !getBooksQuery.isFetching
        ) {
            setBooks(getBooksQuery.data.body);
            setBooksCount(getBooksQuery.data.pageInfo.totalElements);
            setPageInfo(getBooksQuery.data.pageInfo);
        }
    }, [getBooksQuery.isSuccess, getBooksQuery.data, getBooksQuery.isFetching]);

    const handleApplyFilters = (newFilters: Partial<BooksFilters>) => {
        setFilters((filters) => ({ ...filters, ...newFilters }));
    };

    const handleClearFilters = (filtersKeys?: FilterName[]) => {
        if (filtersKeys) {
            const resetFilters = Object.fromEntries(
                filtersKeys.map((filterName) => [filterName, undefined])
            );
            setFilters((filters) => ({ ...filters, ...resetFilters }));
        } else setFilters({});
    };

    const pageTitle = t(
        `PAGES.LIBRARY.${filters.searchText ? "SEARCH_RESULTS" : "All_BOOKS"}`,
        { bookCount }
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
                        isClearAvailable={Boolean(filters.searchText)}
                        onClear={() =>
                            handleClearFilters(["searchText", "page"])
                        }
                    />
                }
            />
            <PageSection
                isLoading={getBooksQuery.isLoading || getBooksQuery.isFetching}
                padding="25px 15px"
            >
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

export default UserLibraryPage;
