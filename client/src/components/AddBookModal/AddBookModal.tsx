import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploadField from "../FileUploadField/FileUploadField";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";
import * as Yup from "yup";
import { useAddBookMutation } from "../../api/booksApi";
import { useLazyGetFileUploadDataQuery } from "../../api/filesApi";
import { useUploadFileMutation } from "../../api/awsApi";

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
    coverPhoto?: File;
}

const initialValues: AddBookFormValues = {
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

    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const handleUploadFile = async (file: File) => {
        const dataRequestResponse = await fileUploadDataRequest();
        if (dataRequestResponse.isSuccess && dataRequestResponse.data) {
            const { url, objectKey } = dataRequestResponse.data;
            await uploadFileRequest({ url, file });
            return objectKey;
        }
        return undefined;
    };

    const handleSubmit = async (formValues: AddBookFormValues) => {
        setIsLoading(true);
        let objectKey = undefined;
        if (formValues.coverPhoto) {
            objectKey = await handleUploadFile(formValues.coverPhoto);
        }
        addBookRequest({
            ...formValues,
            coverPhoto: objectKey,
            userId: userId,
        });
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string()
                .min(2, t("VALIDATION.TOO_SHORT", { minLetters: 2 }).toString())
                .max(
                    50,
                    t("VALIDATION.TOO_LONG", { maxLetters: 50 }).toString()
                )
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            author: Yup.string()
                .min(2, t("VALIDATION.TOO_SHORT", { minLetters: 2 }).toString())
                .max(
                    50,
                    t("VALIDATION.TOO_LONG", { maxLetters: 50 }).toString()
                )
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            description: Yup.string().max(
                500,
                t("VALIDATION.TOO_LONG", { maxLetters: 500 }).toString()
            ),
            publicationYear: Yup.number(),
            numberOfPages: Yup.number(),
            coverPhoto: Yup.mixed()
                .test(
                    "fileSize",
                    t("VALIDATION.FILE_TOO_BIG", { maxFileSize: 5 }).toString(),
                    (value) => (value ? value?.size <= 1000000 * 5 : true)
                )
                .test(
                    "type",
                    t("VALIDATION.FILE_WRONG_FORMAT", {
                        allowedFormats: ["jpg", "png"],
                    }).toString(),
                    (value) =>
                        value && value.type
                            ? value.type === "image/png" ||
                              value.type === "image/jpeg"
                            : true
                ),
        }),
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    const handleClose = useCallback(() => {
        formik.resetForm();
        setErrorMessage(undefined);
        addBookRequestStatus.reset();
        onClose();
    }, [addBookRequestStatus, formik, onClose]);

    useEffect(() => {
        if (
            addBookRequestStatus.isError &&
            "data" in addBookRequestStatus.error
        ) {
            const error = t(
                addBookRequestStatus.error.data as string
            ).toString();
            setErrorMessage(error);
            setIsLoading(false);
        } else {
            setErrorMessage(undefined);
        }
    }, [addBookRequestStatus.isError, addBookRequestStatus.error, t]);

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
            onSubmit={formik.submitForm}
            submitLabel={t("COMMON.ADD_BOOK_ACTION")}
            onClose={handleClose}
            title={t("COMMON.ADD_NEW_BOOK_ACTION")}
            errorMessage={errorMessage}
            isLoading={isLoading}
            formFields={
                <>
                    <InputField
                        label={t("COMMON.BOOK_TITLE")}
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={Boolean(formik.errors.title)}
                        helperText={formik.errors.title}
                    />
                    <InputField
                        label={t("COMMON.BOOK_AUTHOR")}
                        type="text"
                        name="author"
                        onChange={formik.handleChange}
                        value={formik.values.author}
                        error={Boolean(formik.errors.author)}
                        helperText={formik.errors.author}
                    />
                    <TextareaField
                        label={t("COMMON.DESCRIPTION")}
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={Boolean(formik.errors.description)}
                        helperText={formik.errors.description}
                    />
                    <Box display="flex" gap={2}>
                        <InputField
                            label={t("COMMON.PUBLICATION_YEAR")}
                            type="number"
                            name="publicationYear"
                            onChange={formik.handleChange}
                            value={formik.values.publicationYear || ""}
                            error={Boolean(formik.errors.publicationYear)}
                            helperText={formik.errors.publicationYear}
                        />
                        <InputField
                            label={t("COMMON.NUMBER_OF_PAGES")}
                            type="number"
                            name="numberOfPages"
                            onChange={formik.handleChange}
                            value={formik.values.numberOfPages || ""}
                            error={Boolean(formik.errors.numberOfPages)}
                            helperText={formik.errors.numberOfPages}
                        />
                    </Box>
                    <FileUploadField
                        label={t("COMMON.COVER_PHOTO") as string}
                        acceptedFileFormats={["png", "jpg"]}
                        maxFileSizeInMb={5}
                        onChange={(file) => {
                            formik
                                .setFieldValue("coverPhoto", file)
                                .then(() => {
                                    formik.validateField("coverPhoto");
                                });
                        }}
                        error={Boolean(formik.errors.coverPhoto)}
                        helperText={formik.errors.coverPhoto}
                    />
                </>
            }
        />
    );
};

export default AddBookModal;
