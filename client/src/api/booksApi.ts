import { Book, PagedResponse, PageInfo } from "../models/app.models";
import { appApi } from "./appApi";

export interface BooksRequestParams {
    searchText?: string;
    page?: number;
    size?: number;
}

export interface SearchBooksRequest {
    text: string;
}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<PagedResponse<Book>, BooksRequestParams>({
            query: ({ searchText, page, size }) => ({
                url: `/books`,
                params: {
                    searchText,
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
