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

interface CreateTransactionsRequestParams {
    bookId: string;
}

interface CreateTransactionsResponse extends Transaction {}

export const transactionsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserTransactions: builder.query<
            UserTransactionsResponse[],
            UserTransactionsRequestParams
        >({
            query: ({ userId }) => `/transactions/${userId}`,
            providesTags: ['Transactions']
        }),

        getNumberOfTransactions: builder.query<
            number,
            UserTransactionsRequestParams
        >({
            query: ({ userId }) => `/transactions/${userId}/count`,
            providesTags: ['Transactions']
        }),

        createTransaction: builder.mutation<
            CreateTransactionsResponse,
            CreateTransactionsRequestParams
        >({
            query: ({ bookId }) => ({
                url: `/transactions`,
                method: "POST",
                params: { bookId },
            }),
            invalidatesTags: ['Transactions']
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
            invalidatesTags: ['Transactions']
        }),
    }),
});

export const { useGetUserTransactionsQuery, useCreateTransactionMutation, useGetNumberOfTransactionsQuery } =
    transactionsApi;
