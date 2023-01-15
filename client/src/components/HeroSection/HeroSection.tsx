import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { translationPl } from "../../common/constants";
import { theme } from "../../config/theme";
import commonClasses from "../../common/App.module.css";
import classes from "./HeroSection.module.css";
import PageSection from "../PageSection/PageSection";

const HeroSection = (): JSX.Element => {
    const isImageVisible = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <PageSection>
            <Grid2 container alignContent="center" spacing={12}>
                <Grid2 className={classes.heroTextContent} md={6} xs={12}>
                    <Typography
                        variant="h1"
                        textAlign={isImageVisible ? "left" : "center"}
                    >
                        {translationPl.heroTitle}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        textAlign={isImageVisible ? "left" : "center"}
                    >
                        {translationPl.heroSubtitle}
                    </Typography>
                    <Grid2
                        container
                        gap={1}
                        justifyContent={
                            isImageVisible ? "flex-start" : "center"
                        }
                    >
                        <Link underline="none" href="/login">
                            <Button variant="outlined">
                                {translationPl.login}
                            </Button>
                        </Link>
                        <Link underline="none" href="/register">
                            <Button variant="contained">
                                {translationPl.register}
                            </Button>
                        </Link>
                    </Grid2>
                </Grid2>
                {isImageVisible && (
                    <Grid2 md={6} xs={12} className="item">
                        <Box className={commonClasses.gridImgContainer}>
                            <img src="hero-img.png" alt="" />
                        </Box>
                    </Grid2>
                )}
            </Grid2>
        </PageSection>
    );
};

export default HeroSection;
