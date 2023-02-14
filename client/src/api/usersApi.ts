import { User } from "../models/app.models";
import { appApi } from "./appApi";

interface GetUsersResponse {
    users: User[];
}

export interface GetUserBooksRequest {
    userId: string;
}

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

export const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
        }),

        // getUserBooks: builder.query<BookResponse[], GetUserBooksRequest>({
        //     query: ({ userId }) => ({
        //         url: `/users/${userId}/books`,
        //     }),
        //     providesTags: ["Books"],
        // }),

        addBook: builder.mutation<AddBookResponse, AddBookRequest>({
            query: ({ userId, ...body }) => ({
                url: `/users/${userId}/books`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Statistics", "Books"],
        }),
    }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useAddBookMutation } =
    userApi;
