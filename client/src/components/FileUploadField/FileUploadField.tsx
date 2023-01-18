import { UploadFileRounded } from "@mui/icons-material";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import classes from "./FileUploadField.module.css";

interface FileUploadFieldProps {
    label?: string;
    actionLabel?: string;
    acceptedFileFormats?: string[];
    maxFileSizeInMb?: number;
}

const FileUploadField = ({
    label,
    actionLabel,
    acceptedFileFormats,
    maxFileSizeInMb,
}: FileUploadFieldProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Box className={classes.fieldContainer}>
            <InputLabel>{label}:</InputLabel>
            <Box className={classes.uploadButtonContainer}>
                <Button startIcon={<UploadFileRounded />} variant="text">
                    {actionLabel || t("COMMON.UPLOAD_FILE_ACTION")}
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
