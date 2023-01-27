import { Link, Typography } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../api/authApi";
import useServerError from "../../hooks/useServerError";
import { AuthContext } from "../../context/AuthContext";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./loginFormSchema";
import { yupResolver } from '@hookform/resolvers/yup';

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

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors: formErrors },
        reset: resetForm,
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginFormSchema),
    });

    const handleLogin = handleSubmitForm((data) => loginRequest(data));

    const handleClose = useCallback(() => {
        handleResetErrorMessage();
        loginRequestStatus.reset();
        resetForm();
        onClose();
    }, [handleResetErrorMessage, loginRequestStatus, onClose, resetForm]);

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
            onSubmit={handleLogin}
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
                        {...register("email")}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email?.message}
                    />
                    <InputField
                        label={t("COMMON.PASSWORD")}
                        type="password"
                        {...register("password")}
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password?.message}
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
