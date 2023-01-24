import { ReactNode } from "react";
import { Navigate } from "react-router";
import { selectIsLoggedUser } from "../../features/authSlice";
import useAppSelector from "../../hooks/useAppSelector";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const isLoggedUser = useAppSelector(selectIsLoggedUser);

    if (!isLoggedUser) return <Navigate to="/error" replace />;

    return <>{children}</>;
};

export default AuthGuard;
