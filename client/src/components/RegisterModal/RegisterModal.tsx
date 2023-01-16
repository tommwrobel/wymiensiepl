import { Link, Typography } from "@mui/material";
import FormModal from "../FormModal/FormModal";
import { InputField } from "../InputField/InputField";

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

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={() => console.log("not implemented")}
            submitActionLabel="Zarejestruj się"
            onClose={onClose}
            title={"Zarejestruj się"}
            formFields={
                <>
                    <InputField
                        label="Nazwa użytkownika:"
                        type="text"
                        name="name"
                    />
                    <InputField
                        label="Adres e-mail:"
                        type="email"
                        name="email"
                    />
                    <InputField
                        label="Hasło:"
                        type="password"
                        name="password"
                    />

                    <InputField
                        label="Powtórz hasło:"
                        type="password"
                        name="password_repeat"
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
