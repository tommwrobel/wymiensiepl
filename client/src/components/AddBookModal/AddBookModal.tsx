import { Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../api/authApi";
import { setUser } from "../../features/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import FormModal from "../FormModal/FormModal";
import { InputField } from "../InputField/InputField";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: () => void;
}

const AddBookModal = ({
    isOpen,
    onClose,
    onRegister,
}: AddBookModalProps): JSX.Element => {

    const [loginRequest, loginRequestStatus] = useLoginMutation();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Adres e-mail jest niepoprawny.").required("Adres e-mail jest wymagany."),
            password: Yup.string().required("Hasło jest wymagane."),
        }),
        validateOnChange: false,
        onSubmit: values => {
            loginRequest(values);
        }
    });

    const handleRegister = () => {
        onRegister();
        onClose();
    };

    const handleClose = useCallback(() => {
        formik.resetForm();
        loginRequestStatus.reset();
        onClose();
    }, [formik, loginRequestStatus, onClose]);

    useEffect(() => {
        if (loginRequestStatus.isSuccess && loginRequestStatus.data) {
            dispatch(setUser(loginRequestStatus.data));
            setTimeout(function() { handleClose(); }, 3000);
        }
    }, [loginRequestStatus.isSuccess, loginRequestStatus.data, onClose, handleClose, dispatch]);

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={formik.handleSubmit}
            submitLabel="Zaloguj się"
            submitLoading={loginRequestStatus.isLoading}
            onClose={handleClose}
            title={"Zaloguj się"}
            errorMessage={loginRequestStatus.isError ? "Logowanie nie powiodło się." : undefined}
            successMessage={loginRequestStatus.isSuccess ? "Zostałeś poprawnie zalogowany!" : undefined}
            formFields={
                <>
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
                </>
            }
            footer={
                <Typography textAlign="center" variant="body2">
                    Nie masz jeszcze konta?{" "}
                    <Link onClick={handleRegister}>Zarejestruj się</Link>!
                </Typography>
            }
        />
    );
};

export default AddBookModal;
