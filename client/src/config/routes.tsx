import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import BookPage from "../pages/BookPage/BookPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";
import TestPage from "../pages/TestPage/TestPage";
import UserLibraryPage from "../pages/UserLibraryPage/UserLibraryPage";

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
        path: "/library/:userId",
        element: (
            <AuthGuard>
                <UserLibraryPage />
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
