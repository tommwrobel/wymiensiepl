import { Clear, UploadFileRounded } from "@mui/icons-material";
import { Box, Button, IconButton, InputLabel } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./FileUploadField.module.css";

interface FileUploadFieldProps {
    label?: string;
    actionLabel?: string;
    acceptedFileFormats?: string[];
    maxFileSizeInMb?: number;
    onChange: (file?: File) => void;
    error?: boolean;
    helperText?: string;
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

    const [file, setFile] = useState<File | undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            console.log("niema")
            setFile(undefined);
            return;
        }
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
            onChange(event.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        if (fileInputRef.current?.value)
            fileInputRef.current.value = "";
        setFile(undefined);
        onChange(undefined);
    };

    const truncText = (text: string, length: number) =>
        text.slice(0, length - 1) + (text.length > length ? "..." : "");

    return (
        <Box className={classes.fieldContainer}>
            <InputLabel>{label}:</InputLabel>
            <Box className={classes.uploadButtonContainer}>
                <Button
                    startIcon={<UploadFileRounded />}
                    variant="text"
                    component="label"
                >
                    {actionLabel || t("COMMON.UPLOAD_FILE_ACTION")}{" "}
                    {file?.name && ` (${truncText(file?.name, 20)})`}
                    <input
                        ref={fileInputRef}
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleChooseFile}
                    />
                </Button>
                {file && (
                    <IconButton onClick={handleRemoveFile} size="small">
                        <Clear fontSize="inherit" color="error" />
                    </IconButton>
                )}
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
