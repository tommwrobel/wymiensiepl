import { appApi } from "./appApi";

interface AddBookRequestArgs {
    userId: string,
    title: string,
    author: string,
    description?: string,
    publicationYear?: number,
    numberOfPages?: number,
    coverPhoto?: string
}

export interface AddBookRequestResponse {
    id:string,
    userId: string,
    title: string,
    author: string,
    description?: string,
    publicationYear?: number,
    numberOfPages?: number,
    coverPhoto?: string,
}

export interface BookResponse {
    id: string;
    userId: string;
    title: string;
    author: string;
    description?: string;
    publicationYear?: number;
    numberOfPages?: number;
    coverPhoto?: string;
}

export interface GetUserBooksRequestArgs {
    userId: string;
}

export interface SearchBooksRequestArgs {
    text: string;
}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserBooks: builder.query<BookResponse[], GetUserBooksRequestArgs>({
            query: ({ userId }) => ({
                url: `users/${userId}/books`,
            }),
        }),
        searchBooks: builder.query<BookResponse[], SearchBooksRequestArgs>({
            query: ({ text }) => ({
                url: `books/search?text=${text}`,
            }),
        }),
        addBook: builder.mutation<AddBookRequestResponse, AddBookRequestArgs>({
            query: ({ userId, ...body }) => ({
                url: `users/${userId}/books`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Statistics"],
        }),
    }),
});

export const { useAddBookMutation, useGetUserBooksQuery, useLazySearchBooksQuery } = booksApi;
