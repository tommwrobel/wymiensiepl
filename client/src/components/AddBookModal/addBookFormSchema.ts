import i18n from "i18next";
import * as Yup from "yup";
const t = i18n.t;

export const addBookFormSchema = Yup.object({
    title: Yup.string()
        .min(2, t("VALIDATION.TOO_SHORT", { minLetters: 2 }).toString())
        .max(50, t("VALIDATION.TOO_LONG", { maxLetters: 50 }).toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),

    author: Yup.string()
        .min(2, t("VALIDATION.TOO_SHORT", { minLetters: 2 }).toString())
        .max(50, t("VALIDATION.TOO_LONG", { maxLetters: 50 }).toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),

    description: Yup.string().max(
        500,
        t("VALIDATION.TOO_LONG", { maxLetters: 500 }).toString()
    ),

    publicationYear: Yup.number()
        .nullable()
        .transform((value) => (isNaN(value) ? null : value)),

    numberOfPages: Yup.number()
        .nullable()
        .transform((value) => (isNaN(value) ? null : value)),

    coverPhoto: Yup.mixed()
        .test(
            "fileSize",
            t("VALIDATION.FILE_TOO_BIG", { maxFileSize: 5 }).toString(),
            (value) => {
                if (value && value.length > 0)
                    return value[0].size <= 10000 * 5;
                return true;
            }
        )
        .test(
            "type",
            t("VALIDATION.FILE_WRONG_FORMAT", {
                allowedFormats: ["jpg", "png"],
            }).toString(),
            (value) => {
                if (value && value.length > 0)
                    return (
                        value[0].type === "image/png" ||
                        value[0].type === "image/jpeg"
                    );
                return true;
            }
        ),
});