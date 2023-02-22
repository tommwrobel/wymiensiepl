import { Link, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../api/authApi";
import useServerError from "../../hooks/useServerError";
import { AuthContext } from "../../context/AuthContext";
import AppModal from "../AppModal/AppModal";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./loginFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalProps } from "../../models/app.models";
import { ModalContext } from "../../context/ModalContext";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose }: ModalProps): JSX.Element => {
    const { t } = useTranslation();

    const { login } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    const [loginRequest, loginRequestStatus] = useLoginMutation();
    const [errorMessage] =
        useServerError(loginRequestStatus);

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors: formErrors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginFormSchema),
    });

    const handleLogin = handleSubmitForm((data) => loginRequest(data));

    const handleRegister = () => {
        openModal("REGISTER_MODAL");
        onClose();
    };

    useEffect(() => {
        if (loginRequestStatus.isSuccess && loginRequestStatus.data) {
            login({
                user: loginRequestStatus.data.user,
                token: loginRequestStatus.data.token,
            });
            toast.success(t("COMMON.LOGIN_SUCCESS"));
            onClose();
        }
    }, [loginRequestStatus.isSuccess, loginRequestStatus.data, onClose, login, t]);

    return (
        <AppModal
            isOpen={isOpen}
            onSubmit={handleLogin}
            submitLabel={t("COMMON.LOGIN_ACTION")}
            isLoading={loginRequestStatus.isLoading}
            onClose={onClose}
            title={t("COMMON.LOGIN")}
            errorMessage={errorMessage}
            content={
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
