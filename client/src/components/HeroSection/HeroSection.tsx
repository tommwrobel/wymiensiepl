import {
    Box,
    Button,
    Container,
    Link,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { theme } from "../../config/theme";
import classes from "./HeroSection.module.css";

const HeroSection = (): JSX.Element => {
    const isImageVisible = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Container maxWidth="lg">
            <Grid2 container alignContent="center">
                <Grid2
                    container
                    gap={3}
                    direction="column"
                    justifyContent="center"
                    md={6}
                    xs={12}
                    sx={{ padding: "60px" }}
                >
                    <Typography variant="h1">
                        Lorem ipsum consectetur
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </Typography>
                    <Grid2 container gap={1}>
                        <Link underline="none" href="/login">
                            <Button variant="outlined">Logowanie</Button>
                        </Link>
                        <Link underline="none" href="/register">
                            <Button variant="contained">Rejestracja</Button>
                        </Link>
                    </Grid2>
                </Grid2>
                {isImageVisible && (
                    <Grid2
                        gap={2}
                        direction="column"
                        md={6}
                        xs={12}
                        sx={{ padding: "60px" }}
                    >
                        <Box className={classes.heroImage}>
                            <img src="hero-img.png" alt="" />
                        </Box>
                    </Grid2>
                )}
            </Grid2>
        </Container>
    );
};

export default HeroSection;
