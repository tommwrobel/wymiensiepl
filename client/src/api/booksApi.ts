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

interface AddBookRequestResponse {
    id:string,
    userId: string,
    title: string,
    author: string,
    description?: string,
    publicationYear?: number,
    numberOfPages?: number,
    coverPhoto?: string,
}

export const booksApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        addBook: builder.mutation<AddBookRequestResponse, AddBookRequestArgs>({
            query: ({userId, ...body}) => ({
                url: `users/${userId}/books`,
                method: "POST",
                body
            }),
            invalidatesTags: ['Statistics'],
        }),
    }),
});

export const { useAddBookMutation } = booksApi;
