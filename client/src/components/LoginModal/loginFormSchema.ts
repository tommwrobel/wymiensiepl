import i18n from "i18next";
import * as Yup from "yup";
const t = i18n.t;

export const loginFormSchema =  Yup.object({
    email: Yup.string()
        .email(t("VALIDATION.EMAIL_BAD_FORMAT").toString())
        .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
        
    password: Yup.string().required(
        t("VALIDATION.FIELD_IS_REQUIRED").toString()
    ),
});
