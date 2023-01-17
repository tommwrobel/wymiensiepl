import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "./utils/getApiUrl";

interface StatisticsRequestResponse {
    numberOfUsers: number;
    numberOfBooks: number;
}

export const statisticsApi = createApi({
    reducerPath: "statisticsApi",
    tagTypes: ['Statistics'],
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl(),
    }),
    endpoints: (builder) => ({
        getStatistics: builder.query<StatisticsRequestResponse, void>({
            query: () => "/statistics",
            providesTags: ['Statistics'],
        }),
    }),
});

export const { useGetStatisticsQuery } = statisticsApi;
