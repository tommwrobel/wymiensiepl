import { Link, Typography } from "@mui/material";
import FormModal from "../FormModal/FormModal";
import { InputField } from "../InputField/InputField";

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
    const handleRegister = () => {
        onRegister();
        onClose();
    };

    return (
        <FormModal
            isOpen={isOpen}
            onSubmit={() => console.log("not implemented")}
            submitActionLabel="Zaloguj się"
            onClose={onClose}
            title={"Zaloguj się"}
            formFields={
                <>
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

export default LoginModal;
