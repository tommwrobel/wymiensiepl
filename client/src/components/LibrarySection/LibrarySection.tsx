import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useLazyGetBooksQuery } from "../../api/booksApi";
import BookList from "../BookList/BookList";
import PageSection from "../PageSection/PageSection";
import PageTitleSection from "../PageTitleSection/PageTitleSection";
import SearchInput from "../SearchInput/SearchInput";
import {
    Book,
    BooksFilters,
    FilterName,
    Maybe,
    PageInfo,
} from "../../models/app.models";

interface Props {
    title?: string;
    initialFilters?: Partial<BooksFilters>;
}

const LibrarySection = ({ title, initialFilters = {} }: Props): JSX.Element => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageInfo, setPageInfo] = useState<Maybe<PageInfo>>();
    const [filters, setFilters] = useState<BooksFilters>(initialFilters);
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

    return (
        <>
            <PageTitleSection
                startContent={`${title} (${bookCount})`}
                endContent={
                    <SearchInput
                        onSearch={(searchText) =>
                            handleApplyFilters({ searchText, page: 0 })
                        }
                        isClearAvailable={Boolean(filters.searchText)}
                        onClear={() =>
                            handleClearFilters(["page", "searchText"])
                        }
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
                            page={
                                pageInfo.currentPage
                                    ? pageInfo.currentPage + 1
                                    : 1
                            }
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
        </>
    );
};

export default LibrarySection;
