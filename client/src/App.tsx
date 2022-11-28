
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./config/routes";
import { theme } from "./config/theme";
import { store } from "./store/store";

function App() {
    return (
        <div className="App">
            <StoreProvider store={store}>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </StoreProvider>
        </div>
    );
};

export default App;
