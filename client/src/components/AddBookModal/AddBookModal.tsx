import { Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import FileUploadField from "../FileUploadField/FileUploadField";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import TextareaField from "../TextareaField/TextareaField";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void,
}

const AddBookModal = ({
    isOpen,
    onClose,
}: AddBookModalProps): JSX.Element => {

    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = () => {
        onClose();
    }

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
                    />
                    <TextareaField
                        label={t("COMMON.DESCRIPTION")}
                        type="text"
                        name="description"
                    />
                    <InputField
                        label={t("COMMON.ISBN_NUMBER")}
                        type="number"
                        name="isbn"
                    />
                    <InputField
                        label={t("COMMON.PUBLICATION_YEAR")}
                        type="number"
                        name="publicationYear"
                    />
                    <FileUploadField
                        label={t("COMMON.COVER_PHOTO") as string}
                        actionLabel={t("COMMON.UPLOAD_BOOK_COVER_ACTION") as string}
                        acceptedFileFormats={['*.png', '*.jpg']}
                        maxFileSizeInMb={1}
                    />
                </>
            }
        />
    );
};

export default AddBookModal;
