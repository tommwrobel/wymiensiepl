import { Link, Typography } from "@mui/material";
import { useRegisterMutation } from "../../api/authApi";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import useServerError from "../../hooks/useServerError";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const RegisterModal = ({
    isOpen,
    onClose,
    onLogin,
}: RegisterModalProps): JSX.Element => {
    const { login } = useContext(AuthContext);
    const [registerRequest, registerRequestStatus] = useRegisterMutation();
    const [errorMessage, handleResetErrorMessage] =
        useServerError(registerRequestStatus);
    const { t } = useTranslation();

    interface RegisterFormValues {
        name: string;
        email: string;
        password: string;
        repeatedPassword: string;
    }

    const initialFormValues: RegisterFormValues = {
        name: "",
        email: "",
        password: "",
        repeatedPassword: "",
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, t("VALIDATION.TOO_SHORT", { minLetters: 3 }).toString())
                .max(
                    25,
                    t("VALIDATION.TOO_LONG", { maxLetters: 25 }).toString()
                )
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            email: Yup.string()
                .email(t("VALIDATION.EMAIL_BAD_FORMAT").toString())
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            password: Yup.string()
                .min(3, t("VALIDATION.TOO_SHORT", { minLetters: 3 }).toString())
                .max(
                    25,
                    t("VALIDATION.TOO_LONG", { maxLetters: 25 }).toString()
                )
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            repeatedPassword: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    t("VALIDATION.FIELD_IS_REQUIRED").toString()
                )
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
        }),
        validateOnChange: false,
        onSubmit: (values) => {
            registerRequest(values);
        },
    });

    const handleClose = useCallback(() => {
        formik.resetForm();
        handleResetErrorMessage();
        registerRequestStatus.reset();
        onClose();
    }, [formik, handleResetErrorMessage, registerRequestStatus, onClose]);

    const handleLogin = () => {
        onLogin();
        handleClose();
    };

    useEffect(() => {
        if (registerRequestStatus.isSuccess && registerRequestStatus.data) {
            login({
                user: registerRequestStatus.data.user,
                token: registerRequestStatus.data.token,
            });
            handleClose();
        }
    }, [registerRequestStatus.isSuccess, registerRequestStatus.data, onClose, handleClose, login]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={formik.handleSubmit}
            submitLabel={t("COMMON.REGISTER_ACTION")}
            isLoading={registerRequestStatus.isLoading}
            onClose={handleClose}
            title={t("COMMON.REGISTER")}
            errorMessage={errorMessage}
            formFields={
                <>
                    <InputField
                        required={true}
                        label={t("COMMON.USERNAME")}
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={Boolean(formik.errors.name)}
                        helperText={formik.errors.name}
                    />
                    <InputField
                        label={t("COMMON.EMAIL")}
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}
                    />
                    <InputField
                        label={t("COMMON.PASSWORD")}
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={Boolean(formik.errors.password)}
                        helperText={formik.errors.password}
                    />

                    <InputField
                        label={t("COMMON.REPEAT_PASSWORD")}
                        type="password"
                        name="repeatedPassword"
                        onChange={formik.handleChange}
                        value={formik.values.repeatedPassword}
                        error={Boolean(formik.errors.repeatedPassword)}
                        helperText={formik.errors.repeatedPassword}
                    />
                </>
            }
            footer={
                <Typography textAlign="center" variant="body2">
                    {t("COMMON.HAVE_ACCOUNT")}{" "}
                    <Link onClick={handleLogin}>
                        {t("COMMON.LOGIN_ACTION")}
                    </Link>
                    !
                </Typography>
            }
        />
    );
};

export default RegisterModal;
