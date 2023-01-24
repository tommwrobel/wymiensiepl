import { User } from "../features/authSlice";
import { appApi } from "./appApi";

interface GetUsersRequestResponse {
    users: User[],
}

export const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<
            GetUsersRequestResponse,
            void
        >({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = userApi;
