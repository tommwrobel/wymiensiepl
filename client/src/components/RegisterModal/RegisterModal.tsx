import { Link, Typography } from "@mui/material";
import { useRegisterMutation } from "../../api/authApi";
import FormModal from "../FormModal/FormModal";
import InputField from "../InputField/InputField";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import useServerError from "../../hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "./registerFormSchema";
import { ModalProps } from "../../models/app.models";
import { ModalContext } from "../../context/ModalContext";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    repeatedPassword: string;
}

const RegisterModal = ({
    isOpen,
    onClose,
}: ModalProps): JSX.Element => {
    const { login } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);
    
    const [registerRequest, registerRequestStatus] = useRegisterMutation();
    const [errorMessage, handleResetErrorMessage] =
        useServerError(registerRequestStatus);
    const { t } = useTranslation();

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors: formErrors },
        reset: resetForm,
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerFormSchema),
    });

    const handleRegister = handleSubmitForm((data) => registerRequest(data));

    const handleClose = useCallback(() => {
        handleResetErrorMessage();
        registerRequestStatus.reset();
        resetForm();
        onClose();
    }, [handleResetErrorMessage, registerRequestStatus, resetForm, onClose]);

    const handleLogin = () => {
        openModal("LOGIN_MODAL");
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
            onSubmit={handleRegister}
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
                        {...register("name")}
                        error={Boolean(formErrors.name)}
                        helperText={formErrors.name?.message}
                    />
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
                    />

                    <InputField
                        label={t("COMMON.REPEAT_PASSWORD")}
                        type="password"
                        {...register("repeatedPassword")}
                        error={Boolean(formErrors.repeatedPassword)}
                        helperText={formErrors.repeatedPassword?.message}
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
