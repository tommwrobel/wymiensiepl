import { appApi } from "./appApi";

interface StatisticsResponse {
    numberOfUsers: number;
    numberOfBooks: number;
}

export const statisticsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query<StatisticsResponse, void>({
            query: () => "/statistics",
            providesTags: ['Statistics'],
        }),
    }),
});

export const { useGetStatisticsQuery } = statisticsApi;
