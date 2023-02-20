import { Book, BooksFilters, PagedResponse } from "../models/app.models";
import { appApi } from "./appApi";

interface BooksRequestParams extends BooksFilters {}

interface GetBookResponse extends Book {}

interface BookRequestParams {
    bookId: string;
}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getBook: builder.query<GetBookResponse, BookRequestParams>({
            query: ({ bookId }) => ({
                url: `/books/${bookId}`,
            }),
            providesTags: ["Books"],
        }),

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

        deleteBook: builder.mutation<void, BookRequestParams>({
            query: ({ bookId }) => ({
                url: `books/${bookId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Books', 'Statistics'],
        }),
    }),
});

export const { useGetBooksQuery, useLazyGetBooksQuery, useGetBookQuery, useDeleteBookMutation } =
    booksApi;
