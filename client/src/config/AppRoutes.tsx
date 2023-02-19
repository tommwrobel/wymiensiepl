import { Route, Routes } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import BookPage from "../pages/BookPage/BookPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
import UserLibraryPage from "../pages/UserLibraryPage/UserLibraryPage";

const AppRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
                path="/library"
                element={
                    <AuthGuard>
                        <LibraryPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/library/:userId"
                element={
                    <AuthGuard>
                        <UserLibraryPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/books/:bookId"
                element={
                    <AuthGuard>
                        <BookPage />
                    </AuthGuard>
                }
            />
            <Route path="/error" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
