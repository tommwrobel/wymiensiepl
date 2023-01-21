import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "./utils/getApiUrl";

interface FilesApiResponse {
    url: string;
    objectKey: string;
}

interface UploadFileRequest {
    url: string;
    file: File;
}

export const filesApi = createApi({
    reducerPath: "filesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl(),
    }),
    endpoints: (builder) => ({
        getFileUploadData: builder.mutation<FilesApiResponse, void>({
            query: () => ({
                url: "/generate-upload-url",
                method: "GET",
            }),
        }),

        uploadFile: builder.mutation<void, UploadFileRequest>({
            query: ({ url, file }) => ({
                url,
                method: "PUT",
                body: file,
            }),
        }),
    }),
});

export const { useGetFileUploadDataMutation, useUploadFileMutation } = filesApi;
