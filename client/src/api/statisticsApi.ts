import { appApi } from "./appApi";

interface StatisticsRequestResponse {
    numberOfUsers: number;
    numberOfBooks: number;
}

export const statisticsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query<StatisticsRequestResponse, void>({
            query: () => "/statistics",
            providesTags: ['Statistics'],
        }),
    }),
});

export const { useGetStatisticsQuery } = statisticsApi;
