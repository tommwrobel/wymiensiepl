import { appApi } from "./appApi";

interface FilesApiResponse {
    url: string;
    objectKey: string;
}

interface UploadFileRequest {
    url: string;
    file: File;
}

export const filesApi = appApi.injectEndpoints({
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
