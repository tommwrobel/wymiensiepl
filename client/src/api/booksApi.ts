import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { getApiUrl } from "./utils/getApiUrl";

interface AddBookRequestArgs {
    title: string,
    author: string,
    description?: string,
    publicationYear?: number,
    numberOfPages?: number,
    coverPhoto?: string
}

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}/books`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addBook: builder.mutation<void, AddBookRequestArgs>({
            query: (body) => ({
                url: "",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { useAddBookMutation } = booksApi;
