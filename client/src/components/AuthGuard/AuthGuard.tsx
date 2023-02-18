import { ReactNode, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HomePage from "../../pages/HomePage/HomePage";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const { isLoggedUser } = useContext(AuthContext);

    return <>{isLoggedUser() ? children : <HomePage />}</>;
};

export default AuthGuard;
