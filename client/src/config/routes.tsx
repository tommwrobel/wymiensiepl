import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import BookPage from "../pages/BookPage/BookPage";
import BooksPage from "../pages/BooksPage/BooksPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import MyLibraryPage from "../pages/MyLibraryPage/MyLibraryPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TestPage from "../pages/TestPage/TestPage";

export const router = createBrowserRouter([
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/error",
        element: <ErrorPage />,
    },
    {
        path: "/profile",
        element: (
            <AuthGuard>
                <ProfilePage />
            </AuthGuard>
        ),
    },
    {
        path: "/books/:id",
        element: (
            <AuthGuard>
                <BookPage />
            </AuthGuard>
        ),
    },
    {
        path: "/books",
        element: (
            <AuthGuard>
                <BooksPage />
            </AuthGuard>
        ),
    },
    {
        path: "/mylibrary",
        element: (
            <AuthGuard>
                <MyLibraryPage />
            </AuthGuard>
        ),
    },
]);
