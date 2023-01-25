import { User } from "../models/app.models";
import { appApi } from "./appApi";

interface GetUsersResponse {
    users: User[],
}

export const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<
            GetUsersResponse,
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
