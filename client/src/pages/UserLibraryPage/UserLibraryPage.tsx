import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useGetBooksQuery } from "../../api/booksApi";
import { useGetUserQuery } from "../../api/usersApi";
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
    User,
} from "../../models/app.models";

const UserLibraryPage = (): JSX.Element => {
    const { t } = useTranslation();

    const { userId } = useParams();

    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<Maybe<User>>();
    const [pageInfo, setPageInfo] = useState<Maybe<PageInfo>>();
    const [filters, setFilters] = useState<BooksFilters>({ userId });
    const [bookCount, setBooksCount] = useState<Maybe<number>>(0);

    const booksQuery = useGetBooksQuery(filters);
    const userQuery = useGetUserQuery(
        { userId: userId as string },
        { skip: userId === undefined }
    );

    useEffect(() => {
        if (booksQuery.isSuccess && booksQuery.data) {
            setBooks(booksQuery.data.body);
            setBooksCount(booksQuery.data.pageInfo.totalElements);
            setPageInfo(booksQuery.data.pageInfo);
        }
    }, [booksQuery.isSuccess, booksQuery.data]);

    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            setUser(userQuery.data);
        }
    }, [userQuery.isSuccess, userQuery.data]);

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
                startContent={t("PAGES.LIBRARY.USER_BOOKS", {
                    userName: user?.name,
                    bookCount,
                })}
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

export default UserLibraryPage;
