import "./App.css";
import "./locales/config";
import { ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./config/routes";
import { theme } from "./config/theme";
import { store } from "./store/store";
import AuthContextProvider from "./context/AuthContext";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
                    <AuthContextProvider>
                        <RouterProvider router={router} />
                    </AuthContextProvider>
                </StoreProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
