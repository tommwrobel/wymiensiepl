import { Book } from "../models/app.models";
import { appApi } from "./appApi";

interface AddBookRequest {
    userId: string;
    title: string;
    author: string;
    description?: string;
    publicationYear?: number;
    numberOfPages?: number;
    coverPhoto?: string;
}

export interface AddBookResponse {
    id: string;
    userId: string;
    title: string;
    author: string;
    description?: string;
    publicationYear?: number;
    numberOfPages?: number;
    coverPhoto?: string;
}

export interface BookResponse extends Book {}

export interface GetUserBooksRequest {
    userId: string;
}

export interface SearchBooksRequest {
    text: string;
}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserBooks: builder.query<BookResponse[], GetUserBooksRequest>({
            query: ({ userId }) => ({
                url: `users/${userId}/books`,
            }),
        }),
        searchBooks: builder.query<BookResponse[], SearchBooksRequest>({
            query: ({ text }) => ({
                url: `books/search?text=${text}`,
            }),
        }),
        addBook: builder.mutation<AddBookResponse, AddBookRequest>({
            query: ({ userId, ...body }) => ({
                url: `users/${userId}/books`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Statistics"],
        }),
    }),
});

export const {
    useAddBookMutation,
    useGetUserBooksQuery,
    useLazySearchBooksQuery,
} = booksApi;
