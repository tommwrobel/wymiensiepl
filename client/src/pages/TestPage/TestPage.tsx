import { ChangeEvent, useState } from "react";
import { useUploadFileMutation } from "../../api/awsApi";
import {
    useLazyGetFileUploadDataQuery,
} from "../../api/filesApi";
import { useGetStatisticsQuery } from "../../api/statisticsApi";
import { useGetUsersQuery, useLazyGetUsersQuery } from "../../api/usersApi";
import { selectAuthUser, selectIsLoggedUser } from "../../features/authSlice";
import useAppSelector from "../../hooks/useAppSelector";
import { RootState, store } from "../../store/store";

const TestPage = (): JSX.Element => {
    const isLoggedUser = useAppSelector(selectIsLoggedUser);

    const [trigger, request] = useLazyGetUsersQuery();
    const stats = useGetStatisticsQuery();

    const [file, setFile] = useState<File | undefined>();
    const [uploadFileRequest, uploadFileRequestStatus] =
        useUploadFileMutation();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0)
            setFile(e.target.files[0]);
    };

    const url = "https://wymiensiepl.s3.eu-central-1.amazonaws.com/book-covers/0daf4af5-8dd7-453e-958f-6d78e88dd55d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230124T180956Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAT7RVIJJFHAFZI6ZK%2F20230124%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=fff93e1129751746cd1a2b03039799a7f03b016649c457625acd2c13b31106fb";
    return (
        <>
            {file && (
                <button onClick={() => uploadFileRequest({url, file})}>
                    DAWAJ!
                </button>
            )}

            <input type="file" onChange={handleOnChange}></input>

            <button onClick={() => trigger()}>PERFORM</button>
            {isLoggedUser ? "logged!" : "nope"}
            <pre>{JSON.stringify(stats.data, null, 4)}</pre>
            {request.isSuccess && (
                <pre>{JSON.stringify(request.data, null, 4)}</pre>
            )}
        </>
    );
};

export default TestPage;
