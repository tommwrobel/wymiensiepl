import { ReactNode, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const { isLoggedUser } = useContext(AuthContext);

    return <>{isLoggedUser ? children : <Navigate to="/" />}</>;
};

export default AuthGuard;
