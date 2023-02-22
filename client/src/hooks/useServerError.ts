import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Maybe } from "../models/app.models";

interface RequestStatus {
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
}

type UseServerErrorHook = [Maybe<string>, () => void];

const useServerError = (requestStatus: RequestStatus): UseServerErrorHook => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState<Maybe<string>>(undefined);

    const handleResetErrorMessage = () => setErrorMessage(undefined);

    useEffect(() => {
        if (
            requestStatus.isError &&
            requestStatus.error &&
            "data" in requestStatus.error &&
            requestStatus.error.data
        ) {
            const error = t(requestStatus.error.data as string).toString();
            setErrorMessage(error);
        } else if (requestStatus.isError) {
            setErrorMessage(t("COMMON.SERVER_ERROR").toString());
        } else setErrorMessage(undefined);
    }, [requestStatus.isError, requestStatus.error, t, requestStatus]);

    return [errorMessage, handleResetErrorMessage];
};

export default useServerError;
