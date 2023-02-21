import { Transaction } from "../models/app.models";
import { appApi } from "./appApi";

interface UserTransactionsRequestParams {
    userId: string;
}

interface UserTransactionsResponse extends Transaction {}

interface AcceptTransactionsRequestParams {
    transactionId: string;
    bookId: string;
}

interface AcceptTransactionsResponse extends Transaction {}

export const transactionsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserTransactions: builder.query<
            UserTransactionsResponse,
            UserTransactionsRequestParams
        >({
            query: ({ userId }) => `/transactions/${userId}`,
        }),

        acceptTransaction: builder.mutation<
            AcceptTransactionsResponse,
            AcceptTransactionsRequestParams
        >({
            query: ({ transactionId, bookId }) => ({
                url: `/transactions/${transactionId}`,
                method: "PATCH",
                body: {
                    transactionStatus: "ACCEPTED",
                    bookId,
                },
            }),
        }),
    }),
});

export const { useGetUserTransactionsQuery } = transactionsApi;
