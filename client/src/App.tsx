import "./App.css";
import "./locales/config";
import { ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import { theme } from "./config/theme";
import { store } from "./store/store";
import AuthContextProvider from "./context/AuthContext";
import ModalContextProvider from "./context/ModalContext";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./config/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
                    <AuthContextProvider>
                        <ModalContextProvider>
                            <BrowserRouter>
                                <ApplicationBar />
                                <AppRoutes />
                                <Footer />
                                <ToastContainer
                                    theme="light"
                                    position="bottom-center"
                                    autoClose={3000}
                                />
                            </BrowserRouter>
                        </ModalContextProvider>
                    </AuthContextProvider>
                </StoreProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
