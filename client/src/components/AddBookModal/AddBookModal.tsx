import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploadField from "../FileUploadField/FileUploadField";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";
import * as Yup from "yup";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface InitialFormValues {
    title: string;
    author: string;
    description: string;
    publicationYear: string;
    numberOfPages: string;
    coverFile: File | null;
}

const AddBookModal = ({ isOpen, onClose }: AddBookModalProps): JSX.Element => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const initialValues: InitialFormValues = {
        title: "",
        author: "",
        description: "",
        publicationYear: "",
        numberOfPages: "",
        coverFile: null,
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string().max(50).required(),
            author: Yup.string().max(50).required(),
            description: Yup.string().max(400),
            publicationYear: Yup.number().min(1000).max(2023),
            numberOfPages: Yup.number(),
            coverFile: Yup.mixed().test(
                "fileSize",
                "File Size is too large",
                (value) => value?.size <= 2000
            ),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = () => {
        onClose();
    };

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitLabel={t("COMMON.ADD_BOOK_ACTION")}
            onClose={handleClose}
            title={t("COMMON.ADD_NEW_BOOK_ACTION")}
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
                            value={formik.values.publicationYear}
                            error={Boolean(formik.errors.publicationYear)}
                            helperText={formik.errors.publicationYear}
                        />
                        <InputField
                            label={t("COMMON.NUMBER_OF_PAGES")}
                            type="number"
                            name="numberOfPages"
                            onChange={formik.handleChange}
                            value={formik.values.numberOfPages}
                            error={Boolean(formik.errors.numberOfPages)}
                            helperText={formik.errors.numberOfPages}
                        />
                    </Box>
                    <FileUploadField
                        label={t("COMMON.COVER_PHOTO") as string}
                        acceptedFileFormats={["png", "jpg"]}
                        maxFileSizeInMb={2}
                        onChange={(file) =>
                            formik.setFieldValue("coverFile", file)
                        }
                        error={Boolean(formik.errors.coverFile)}
                        helperText={formik.errors.coverFile}
                    />
                </>
            }
        />
    );
};

export default AddBookModal;
