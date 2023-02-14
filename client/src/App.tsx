import "./App.css";
import "./locales/config";
import { ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./config/routes";
import { theme } from "./config/theme";
import { store } from "./store/store";
import AuthContextProvider from "./context/AuthContext";
import ModalContextProvider from "./context/ModalContext";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
                    <AuthContextProvider>
                        <ModalContextProvider>
                            <ApplicationBar />
                            <RouterProvider router={router} />
                        </ModalContextProvider>
                    </AuthContextProvider>
                </StoreProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
