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
    transitions: {
        duration: {
            enteringScreen: 0,
            leavingScreen: 0,
        },
    },
    palette: {
        primary: {
            main: "#E16C39",
            light: "#FF8957",
            dark: "#DA6330",
        },
        secondary: {
            main: "#338de8",
            light: "#2083e6",
            dark: "#4497ea",
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
                    color: grey[800],
                },
                h1: {
                    fontSize: "32pt",
                    lineHeight: "36pt",
                    fontWeight: "400",
                },
                h2: {
                    fontSize: "24pt",
                    lineHeight: "30pt",
                    fontWeight: "400",
                },
                h3: {
                    fontSize: "20pt",
                    lineHeight: "30pt",
                    fontWeight: "400",
                },
                subtitle1: {
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: grey[600],
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    backgroundColor: "#E16C39",
                    color: "#FFFFFF",
                    textAlign: "center",
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: 48,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "0.9rem",
                    paddingLeft: 12,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: "pointer",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {backgroundColor: "white",},
                notchedOutline: {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                },
            },
        }
    },
});

export const customColors = {
    primary: theme.palette.primary.main.toString(),
    secondary: theme.palette.secondary.main.toString(),

    success: theme.palette.success.main.toString(),
    warning: theme.palette.warning.main.toString(),
    error: theme.palette.error.main.toString(),

    lightGrey: theme.palette.grey[100].toString(),
    darkGrey: theme.palette.grey[800].toString(),
    mediumGrey: theme.palette.grey[400].toString(),

    white: "white",
    black: "black",
}

export type themeColor = keyof typeof customColors;
