import { ReactNode, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const { isLoggedUser } = useContext(AuthContext);

    return <>{isLoggedUser() ? children : <ErrorPage />}</>;
};

export default AuthGuard;
