import { ReactNode } from "react";
import { selectIsLoggedUser } from "../../features/authSlice";
import useAppSelector from "../../hooks/useAppSelector";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
    const isLoggedUser = useAppSelector(selectIsLoggedUser);

    return <>{isLoggedUser ? children : <ErrorPage />}</>;
};

export default AuthGuard;
