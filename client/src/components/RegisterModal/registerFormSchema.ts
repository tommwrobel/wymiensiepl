import i18n from "i18next";
import * as Yup from "yup";
const t = i18n.t;

export const registerFormSchema = Yup.object({
    name: Yup.string()
        .min(3, t("VALIDATION.TOO_SHORT", { minLetters: 3 }).toString())
        .max(25, t("VALIDATION.TOO_LONG", { maxLetters: 25 }).toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),

    email: Yup.string()
        .email(t("VALIDATION.EMAIL_BAD_FORMAT").toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),

    password: Yup.string()
        .min(3, t("VALIDATION.TOO_SHORT", { minLetters: 3 }).toString())
        .max(25, t("VALIDATION.TOO_LONG", { maxLetters: 25 }).toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
        
    repeatedPassword: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            t("VALIDATION.PASSWORDS_NOT_MATCH").toString()
        )
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
});
