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
        secondary: {
            main: "#338de8",
            light: "#2083e6",
            dark: "#4497ea",
        }
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
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: 48,
                    minWidth: 360,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "0.9rem",
                    paddingLeft: 12
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: "pointer",
                }
            }
        },
    },
});
