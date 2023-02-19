import { User } from "../models/app.models";
import { appApi } from "./appApi";

interface GetUsersResponse {
    users: User[];
}

interface GetUserResponse extends User {}
interface GetUserRequestParams {
    userId: string;
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

        getUser: builder.query<GetUserResponse, GetUserRequestParams>({
            query: ({ userId }) => ({
                url: `/users/${userId}`,
                method: "GET",
            }),
        }),

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

export const { useGetUsersQuery, useLazyGetUsersQuery, useGetUserQuery, useAddBookMutation } =
    userApi;
