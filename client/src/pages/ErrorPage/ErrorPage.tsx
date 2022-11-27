import { useRouteError } from "react-router";

const ErrorPage = (): JSX.Element => {

    const error = useRouteError();

    console.log(error);

    return (
        <>
            404
        </>
    );
};

export default ErrorPage;
