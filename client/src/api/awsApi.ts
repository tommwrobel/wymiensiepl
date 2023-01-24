import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "./utils/getApiUrl";

export interface UploadFileRequest {
    url: string;
    file: File;
}
export const awsApi = createApi({
    reducerPath: "awsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getApiUrl()}`,
    }),
    endpoints: (builder) => ({
        uploadFile: builder.mutation<void, UploadFileRequest>({
            query: ({ url, file }) => ({
                url,
                headers: {
                    authorization: undefined,
                },
                method: "PUT",
                body: file,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = awsApi;
