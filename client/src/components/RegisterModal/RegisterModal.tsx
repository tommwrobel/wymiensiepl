import { Link, Typography } from "@mui/material";
import { useRegisterMutation } from "../../api/auth/authApi";
import FormModal from "../FormModal/FormModal";
import { InputField } from "../InputField/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect } from "react";
import { setUser } from "../../features/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

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
    const handleLogin = () => {
        onLogin();
        onClose();
    };

    const [registerRequest, registerRequestStatus] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatedPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, "Nazwa uytkownika powinna mieć minimum 5 znaków.").required("Nazwa uytkownika jest wymagana."),
            email: Yup.string().email("Adres e-mail jest niepoprawny.").required("Adres e-mail jest wymagany."),
            password: Yup.string().min(5, "Hasło powinno mieć minimum 5 znaków.").required("Hasło jest wymagane."),
            repeatedPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Hasła muszą się zgadzać.').required("Powtórzenie hasła jest wymagane."),
        }),
        validateOnChange: false,
        onSubmit: values => {
            registerRequest(values);
        }
    });

    const handleClose = useCallback(() => {
        formik.resetForm();
        registerRequestStatus.reset();
        onClose();
    }, [formik, registerRequestStatus, onClose]);

    useEffect(() => {
        if (registerRequestStatus.isSuccess && registerRequestStatus.data) {
            dispatch(setUser(registerRequestStatus.data));
            setTimeout(function() { handleClose(); }, 3000);
        }
    }, [registerRequestStatus.isSuccess, registerRequestStatus.data, onClose, handleClose, dispatch]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={formik.handleSubmit}
            submitLabel="Zarejestruj się"
            onClose={handleClose}
            title={"Zarejestruj się"}
            errorMessage={registerRequestStatus.isError ? "Rejestracja nie powiodła się." : undefined}
            successMessage={registerRequestStatus.isSuccess ? "Rejestracja udana! Zostałeś zalogowany." : undefined}
            formFields={
                <>
                    <InputField
                        label="Nazwa użytkownika:"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={Boolean(formik.errors.name)}
                        helperText={formik.errors.name}
                    />
                    <InputField
                        label="Adres e-mail:"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}
                    />
                    <InputField
                        label="Hasło:"
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={Boolean(formik.errors.password)}
                        helperText={formik.errors.password}
                    />

                    <InputField
                        label="Powtórz hasło:"
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
                    Masz ju konto?{" "}
                    <Link onClick={handleLogin}>Zaloguj się</Link>!
                </Typography>
            }
        />
    );
};

export default RegisterModal;
