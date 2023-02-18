import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import BookPage from "../pages/BookPage/BookPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
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
        path: "/test",
        element: (
            <AuthGuard>
                <TestPage />
            </AuthGuard>
        ),
    },
    {
        path: "/library",
        element: (
            <AuthGuard>
                <LibraryPage />
            </AuthGuard>
        ),
    },
]);
