import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploadField from "../FileUploadField/FileUploadField";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";
import { useAddBookMutation } from "../../api/usersApi";
import { useLazyGetFileUploadDataQuery } from "../../api/filesApi";
import { useUploadFileMutation } from "../../api/awsApi";
import useServerError from "../../hooks/useServerError";
import { addBookFormSchema } from "./addBookFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalProps } from "../../models/app.models";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

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

const AddBookModal = ({ isOpen, onClose }: ModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

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
        resetField,
    } = useForm<AddBookFormValues>({
        resolver: yupResolver(addBookFormSchema),
        defaultValues: defaultFormValues,
    });

    const [fileUploadDataError] = useServerError(fileUploadDataRequestStatus);
    const [fileUploadAwsError] = useServerError(uploadFileRequestStatus);
    const [addBookError] = useServerError(addBookRequestStatus);
    const getErrorMessage = () => {
        return (
            fileUploadDataError ||
            fileUploadAwsError ||
            addBookError ||
            undefined
        );
    };

    const handleUploadFile = (file: File) => {
        return new Promise((resolve, reject) => {
            fileUploadDataRequest()
                .then(({ data }) => {
                    if (data) {
                        uploadFileRequest({ url: data.url, file })
                            .then(() => resolve(data.objectKey))
                            .catch(() => reject());
                    } else reject();
                })
                .catch(() => {
                    reject();
                });
        });
    };

    const handleSubmit = handleSubmitForm(async (formValues) => {
        setIsLoading(true);
        if (user) {
            await fileUploadDataRequest();
            let coverPhoto = undefined;
            const userId = user.id;
            if (formValues.coverPhoto?.[0]) {
                handleUploadFile(formValues.coverPhoto[0])
                    .then((objectKey) => {
                        addBookRequest({
                            ...formValues,
                            coverPhoto: objectKey as string,
                            userId,
                        }).then(() => setIsLoading(false));
                    })
                    .catch(() => {
                        setIsLoading(false);
                        return;
                    });
            } else {
                await addBookRequest({
                    ...formValues,
                    coverPhoto,
                    userId,
                });
                setIsLoading(false);
            }
        }
    });

    useEffect(() => {
        if (addBookRequestStatus.isSuccess && addBookRequestStatus.data) {
            toast.success(t("COMMON.ADD_NEW_BOOK_SUCCESS"));
            onClose();
        }
    }, [addBookRequestStatus.isSuccess, addBookRequestStatus.data, onClose, t]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitLabel={t("COMMON.ADD_BOOK_ACTION")}
            onClose={onClose}
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
