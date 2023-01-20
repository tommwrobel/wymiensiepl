import { UploadFileRounded } from "@mui/icons-material";
import { Box, Button, InputLabel } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./FileUploadField.module.css";

interface FileUploadFieldProps {
    label?: string;
    actionLabel?: string;
    acceptedFileFormats?: string[];
    maxFileSizeInMb?: number;
    onChange: (file: File) => void;
    error?: boolean,
    helperText?: string,
}

const FileUploadField = ({
    label,
    actionLabel,
    acceptedFileFormats,
    maxFileSizeInMb,
    onChange,
    error,
    helperText,
}: FileUploadFieldProps): JSX.Element => {
    const { t } = useTranslation();

    const [coverFile, setCoverFile] = useState<File | undefined>();

    const handleChooseCoverFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setCoverFile(undefined);
            return;
        }
        if (event.target.files.length > 0) {
            setCoverFile(event.target.files[0]);
            onChange(event.target.files[0]);
        }
    }

    const truncText = (text: string, length: number) => text.slice(0, length - 1)+(text.length>length?'...':'');

    return (
        <Box className={classes.fieldContainer}>
            <InputLabel>{label}:</InputLabel>
            <Box className={classes.uploadButtonContainer}>
                <Button startIcon={<UploadFileRounded />} variant="text" component="label">
                    {actionLabel || t("COMMON.UPLOAD_FILE_ACTION")} {coverFile?.name && ` (${truncText(coverFile?.name, 25)})`}
                    <input hidden accept="image/*" type="file" onChange={handleChooseCoverFile} />
                </Button>
            </Box>
            {acceptedFileFormats && (
                <span className={classes.fileRequirements}>
                    {t("COMMON.ACCEPTED_FILE_FORMATS", {
                        fileFormats: acceptedFileFormats.join(", "),
                    })}
                </span>
            )}
            {maxFileSizeInMb && (
                <span className={classes.fileRequirements}>
                    {t("COMMON.MAX_FILE_SIZE_IN_MB", { maxFileSizeInMb })}
                </span>
            )}
        </Box>
    );
};

export default FileUploadField;
