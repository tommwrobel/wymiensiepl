import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "./utils/getApiUrl";

interface AddBookRequestArgs {
    title: string,
    author: string,
    description?: string,
    publicationYear?: number,
    numberOfPages?: number,
    coverPhotoKey?: string
}

interface AddBookRequestResponse {
    name: string;
    role: "ADMIN" | "USER";
    token: string;
}

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}/books`,
    }),
    endpoints: (builder) => ({
        addBook: builder.mutation<AddBookRequestResponse, AddBookRequestArgs>({
            query: (body) => ({
                url: "/books",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useAddBookMutation } = booksApi;
