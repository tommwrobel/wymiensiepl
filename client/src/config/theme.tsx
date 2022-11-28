import { createTheme, Shadows } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

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
                    borderBottom: "solid 1px" + grey[300],
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    textTransform: "none",
                },
                text: {
                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: grey[700],
                },
                h1: {
                    fontSize: "32pt",
                    lineHeight: "36pt",
                    fontWeight: "600",
                },
                subtitle1: {
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: grey[600],
                },
            },
        },
    },
});
