import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploadField from "../FileUploadField/FileUploadField";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";
import { useAddBookMutation } from "../../api/booksApi";
import { useLazyGetFileUploadDataQuery } from "../../api/filesApi";
import { useUploadFileMutation } from "../../api/awsApi";
import useServerError from "../../hooks/useServerError";
import { addBookFormSchema } from "./addBookFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddBookModalProps {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
}

interface AddBookFormValues {
    title: string;
    author: string;
    description?: string;
    publicationYear?: number;
    numberOfPages?: number;
    coverPhoto?: File[];
}

const defaultFormValues: AddBookFormValues = {
    title: "",
    author: "",
    description: undefined,
    publicationYear: undefined,
    numberOfPages: undefined,
    coverPhoto: undefined,
};

const AddBookModal = ({
    userId,
    isOpen,
    onClose,
}: AddBookModalProps): JSX.Element => {
    const { t } = useTranslation();

    const [addBookRequest, addBookRequestStatus] = useAddBookMutation();
    const [fileUploadDataRequest, fileUploadDataRequestStatus] =
        useLazyGetFileUploadDataQuery();
    const [uploadFileRequest, uploadFileRequestStatus] =
        useUploadFileMutation();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors: formErrors },
        reset: resetForm,
        resetField,
    } = useForm<AddBookFormValues>({
        resolver: yupResolver(addBookFormSchema),
        defaultValues: defaultFormValues,
    });

    const [fileUploadDataError, resetFileUploadDataError] = useServerError(
        fileUploadDataRequestStatus
    );
    const [fileUploadAwsError, resetFileUploadAwsError] = useServerError(
        uploadFileRequestStatus
    );
    const [addBookError, resetAddBookError] =
        useServerError(addBookRequestStatus);
    const getErrorMessage = () => {
        return (
            fileUploadDataError ||
            fileUploadAwsError ||
            addBookError ||
            undefined
        );
    };

    const handleUploadFile = async (file: File) => {
        const dataRequestResponse = await fileUploadDataRequest();
        if (dataRequestResponse.isSuccess && dataRequestResponse.data) {
            const { url, objectKey } = dataRequestResponse.data;
            await uploadFileRequest({ url, file });
            if (uploadFileRequestStatus.isSuccess) return objectKey;
        }
        return undefined;
    };

    const handleSubmit = handleSubmitForm(async (formValues) => {
        setIsLoading(true);
        let objectKey = undefined;
        if (formValues.coverPhoto && formValues.coverPhoto.length > 0) {
            objectKey = await handleUploadFile(formValues.coverPhoto[0]);
            if (!objectKey) {
                setIsLoading(false);
                return;
            }
        }
        await addBookRequest({
            ...formValues,
            coverPhoto: objectKey,
            userId: userId,
        });
        setIsLoading(false);
    });

    const handleClose = useCallback(() => {
        const handleResetErrors = () => {
            resetFileUploadDataError();
            resetFileUploadAwsError();
            resetAddBookError();
        };
        handleResetErrors();
        addBookRequestStatus.reset();
        resetForm();
        onClose();
    }, [
        addBookRequestStatus,
        onClose,
        resetAddBookError,
        resetFileUploadAwsError,
        resetFileUploadDataError,
        resetForm,
    ]);

    useEffect(() => {
        if (addBookRequestStatus.isSuccess && addBookRequestStatus.data) {
            setIsLoading(false);
            handleClose();
        }
    }, [
        addBookRequestStatus.isSuccess,
        addBookRequestStatus.data,
        handleClose,
    ]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitLabel={t("COMMON.ADD_BOOK_ACTION")}
            onClose={handleClose}
            title={t("COMMON.ADD_NEW_BOOK_ACTION")}
            errorMessage={getErrorMessage()}
            isLoading={isLoading}
            formFields={
                <>
                    <InputField
                        label={t("COMMON.BOOK_TITLE")}
                        type="text"
                        {...register("title")}
                        error={Boolean(formErrors.title)}
                        helperText={formErrors.title?.message}
                    />
                    <InputField
                        label={t("COMMON.BOOK_AUTHOR")}
                        type="text"
                        {...register("author")}
                        error={Boolean(formErrors.author)}
                        helperText={formErrors.author?.message}
                    />
                    <TextareaField
                        label={t("COMMON.DESCRIPTION")}
                        {...register("description")}
                        error={Boolean(formErrors.description)}
                        helperText={formErrors.description?.message}
                    />
                    <Box display="flex" gap={2}>
                        <InputField
                            label={t("COMMON.PUBLICATION_YEAR")}
                            type="number"
                            {...register("publicationYear")}
                            error={Boolean(formErrors.publicationYear)}
                            helperText={formErrors.publicationYear?.message}
                        />
                        <InputField
                            label={t("COMMON.NUMBER_OF_PAGES")}
                            type="number"
                            {...register("numberOfPages")}
                            error={Boolean(formErrors.numberOfPages)}
                            helperText={formErrors.numberOfPages?.message}
                        />
                    </Box>
                    <FileUploadField
                        label={t("COMMON.COVER_PHOTO") as string}
                        acceptedFileFormats={["png", "jpg"]}
                        maxFileSizeInMb={5}
                        error={Boolean(formErrors.coverPhoto)}
                        helperText={formErrors.coverPhoto?.message}
                        {...register("coverPhoto")}
                        onReset={() => resetField("coverPhoto")}
                    />
                </>
            }
        />
    );
};

export default AddBookModal;
