import { createTheme, Shadows } from "@mui/material/styles";

export const theme = createTheme({
    shadows: Array(25).fill("none") as Shadows,
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: "Poppins",
    },
    palette: {
        primary: {
            main: "#E16C39",
            light: "#FF8957",
            dark: "#DA6330",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    borderBottom: "solid 1px #4C4C4C",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    textTransform: "none",
                },
            },
        },
    },
});
