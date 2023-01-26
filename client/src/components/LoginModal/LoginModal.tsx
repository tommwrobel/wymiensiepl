import { Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useLoginMutation } from "../../api/authApi";
import useServerError from "../../hooks/useServerError";
import { AuthContext } from "../../context/AuthContext";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: () => void;
}

const LoginModal = ({
    isOpen,
    onClose,
    onRegister,
}: LoginModalProps): JSX.Element => {
    const { t } = useTranslation();

    const { login } = useContext(AuthContext);
    const [loginRequest, loginRequestStatus] = useLoginMutation();
    const [errorMessage, handleResetErrorMessage] =
        useServerError(loginRequestStatus);

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const initialFormValues: LoginFormValues = {
        email: "",
        password: "",
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t("VALIDATION.EMAIL_BAD_FORMAT").toString())
                .required(t("VALIDATION.FIELD_IS_REQUIRED").toString()),
            password: Yup.string().required(
                t("VALIDATION.FIELD_IS_REQUIRED").toString()
            ),
        }),
        validateOnChange: false,
        onSubmit: (values) => {
            loginRequest(values);
        },
    });

    const handleClose = useCallback(() => {
        formik.resetForm();
        handleResetErrorMessage();
        loginRequestStatus.reset();
        onClose();
    }, [formik, handleResetErrorMessage, loginRequestStatus, onClose]);

    const handleRegister = () => {
        onRegister();
        handleClose();
    };

    useEffect(() => {
        if (loginRequestStatus.isSuccess && loginRequestStatus.data) {
            login({
                user: loginRequestStatus.data.user,
                token: loginRequestStatus.data.token,
            });
            handleClose();
        }
    }, [
        loginRequestStatus.isSuccess,
        loginRequestStatus.data,
        onClose,
        handleClose,
        login,
    ]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={formik.handleSubmit}
            submitLabel={t("COMMON.LOGIN_ACTION")}
            isLoading={loginRequestStatus.isLoading}
            onClose={handleClose}
            title={t("COMMON.LOGIN")}
            errorMessage={errorMessage}
            formFields={
                <>
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
                        autoComplete="on"
                    />
                </>
            }
            footer={
                <Typography textAlign="center" variant="body2">
                    {t("COMMON.DONT_HAVE_ACCOUNT")}{" "}
                    <Link onClick={handleRegister}>
                        {t("COMMON.REGISTER_ACTION")}
                    </Link>
                    !
                </Typography>
            }
        />
    );
};

export default LoginModal;
