import { Route, Routes } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import BookPage from "../pages/BookPage/BookPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
import UserLibraryPage from "../pages/UserLibraryPage/UserLibraryPage";
import MyLibraryPage from "../pages/MyLibraryPage/MyLibraryPage";

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
                path="/books/:bookId"
                element={
                    <AuthGuard>
                        <BookPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/:userId/books"
                element={
                    <AuthGuard>
                        <UserLibraryPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/mylibrary"
                element={
                    <AuthGuard>
                        <MyLibraryPage />
                    </AuthGuard>
                }
            />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
