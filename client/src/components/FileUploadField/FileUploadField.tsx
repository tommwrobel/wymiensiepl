import { Clear, UploadFileRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Input, InputLabel, Typography } from "@mui/material";
import {
    ChangeEvent,
    forwardRef,
    RefAttributes,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import classes from "./FileUploadField.module.css";

interface FileUploadFieldProps extends RefAttributes<HTMLInputElement> {
    label?: string;
    actionLabel?: string;
    acceptedFileFormats?: string[];
    maxFileSizeInMb?: number;
    error?: boolean;
    helperText?: string;
}

const FileUploadField = forwardRef<HTMLInputElement, FileUploadFieldProps>(
    (
        {
            label,
            actionLabel,
            acceptedFileFormats,
            maxFileSizeInMb,
            error,
            helperText,
            ...props
        },
        ref
    ): JSX.Element => {
        const { t } = useTranslation();

        const [file, setFile] = useState<File | undefined>();
        //const fileInputRef = useRef<HTMLInputElement>(null);

        const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
            // if (!event.target.files) {
            //     setFile(undefined);
            //     onChange(undefined);
            //     return;
            // }
            // if (event.target.files.length > 0) {
            //     setFile(event.target.files[0]);
            //     onChange(event.target.files[0]);
            // }
        };

        const handleRemoveFile = () => {
            // if (fileInputRef.current?.value) fileInputRef.current.value = "";
            // setFile(undefined);
        };

        const truncText = (text: string, length: number) =>
            text.slice(0, length - 1) + (text.length > length ? "..." : "");

        return (
            <Box className={classes.fieldContainer}>
                <InputLabel>{label}:</InputLabel>
                <Box
                    className={classes.uploadButtonContainer}
                    borderColor={error ? "#d32f2f" : undefined}
                >
                    <Button
                        startIcon={<UploadFileRounded />}
                        variant="text"
                        component="label"
                    >
                        {actionLabel || t("COMMON.UPLOAD_FILE_ACTION")}{" "}
                        {file?.name && ` (${truncText(file?.name, 20)})`}
                        <input {...props} ref={ref} hidden accept="image/*" type="file" />
                    </Button>
                    {file && (
                        <IconButton onClick={handleRemoveFile} size="small">
                            <Clear fontSize="inherit" color="error" />
                        </IconButton>
                    )}
                </Box>
                {error && helperText && (
                    <span className={classes.fileRequirementsError}>
                        {helperText}
                    </span>
                )}
                {acceptedFileFormats && !helperText && (
                    <span className={classes.fileRequirements}>
                        {t("COMMON.ACCEPTED_FILE_FORMATS", {
                            fileFormats: acceptedFileFormats.join(", "),
                        })}
                    </span>
                )}
                {maxFileSizeInMb && !helperText && (
                    <span className={classes.fileRequirements}>
                        {t("COMMON.MAX_FILE_SIZE_IN_MB", { maxFileSizeInMb })}
                    </span>
                )}
            </Box>
        );
    }
);

export default FileUploadField;
