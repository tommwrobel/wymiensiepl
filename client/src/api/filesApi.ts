import { appApi } from "./appApi";

export interface FilesApiResponse {
    url: string;
    objectKey: string;
}

export const filesApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFileUploadData: builder.query<FilesApiResponse, void>({
            query: () => ({
                url: "/generate-upload-url",
                method: "GET",
            }),
        })
    }),
});

export const { useLazyGetFileUploadDataQuery } = filesApi;
