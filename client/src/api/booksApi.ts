import { Book, BooksFilters, PagedResponse } from "../models/app.models";
import { appApi } from "./appApi";

interface BooksRequestParams extends BooksFilters {}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<PagedResponse<Book>, BooksRequestParams>({
            query: ({ searchText, userId, page, size }) => ({
                url: `/books`,
                params: {
                    searchText,
                    userId,
                    page,
                    size,
                },
            }),
            transformResponse: (response) => {
                const pagedResponse = response as PagedResponse<Book>;
                return {
                    body: pagedResponse.body,
                    pageInfo: pagedResponse.pageInfo,
                };
            },
            providesTags: ["Books"],
        }),
    }),
});

export const { useGetBooksQuery, useLazyGetBooksQuery } = booksApi;
