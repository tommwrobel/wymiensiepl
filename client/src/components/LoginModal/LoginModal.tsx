import { Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useLoginMutation } from "../../api/authApi";
import { setUser } from "../../features/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
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
    const [loginRequest, loginRequestStatus] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t("VALIDATION.EMAIL_BAD_FORMAT")).required("Adres e-mail jest wymagany."),
            password: Yup.string().required("Hasło jest wymagane."),
        }),
        validateOnChange: false,
        onSubmit: values => {
            loginRequest(values);
        }
    });

    const handleClose = useCallback(() => {
        formik.resetForm();
        setErrorMessage(undefined);
        loginRequestStatus.reset();
        onClose();
    }, [formik, loginRequestStatus, onClose]);

    const handleRegister = () => {
        onRegister();
        handleClose();
    };

    useEffect(() => {
        if (loginRequestStatus.isSuccess && loginRequestStatus.data) {
            dispatch(setUser(loginRequestStatus.data));
            setTimeout(function() { handleClose(); }, 3000);
        }
    }, [loginRequestStatus.isSuccess, loginRequestStatus.data, onClose, handleClose, dispatch]);

    useEffect(() => {
        if (loginRequestStatus.isError && 'data' in loginRequestStatus.error) {
            const error = t(loginRequestStatus.error.data as string).toString();
            setErrorMessage(error);
        } else { setErrorMessage(undefined) }
    }, [loginRequestStatus.isError, loginRequestStatus.error, t]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={formik.handleSubmit}
            submitLabel={t("COMMON.LOGIN_ACTION")}
            submitLoading={loginRequestStatus.isLoading}
            onClose={handleClose}
            title={t("COMMON.LOGIN")}
            errorMessage={errorMessage}
            successMessage={loginRequestStatus.isSuccess ? "Zostałeś poprawnie zalogowany!" : undefined}
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
                    />
                </>
            }
            footer={
                <Typography textAlign="center" variant="body2">
                    {t("COMMON.DONT_HAVE_ACCOUNT")}{" "}
                    <Link onClick={handleRegister}>{t("COMMON.REGISTER_ACTION")}</Link>!
                </Typography>
            }
        />
    );
};

export default LoginModal;
