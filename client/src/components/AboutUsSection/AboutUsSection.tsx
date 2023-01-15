import { Box, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { translationPl } from "../../common/constants";
import commonClasses from "../../common/App.module.css";
import { theme } from "../../config/theme";
import PageSection from "../PageSection/PageSection";

const AboutUsSection = (): JSX.Element => {
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <PageSection backgroundColor="#444">
            <Grid2 container alignItems="center" spacing={12}>
                <Grid2 md={6} xs={12}>
                    <Box className={commonClasses.gridImgContainer}>
                        <img src="about-us-img.png" alt="" />
                    </Box>
                </Grid2>
                <Grid2 md={6} xs={12}>
                    <Typography
                        variant="body1"
                        textAlign={isSmallDisplay ? "center" : "left"}
                        color="white"
                    >
                        {translationPl.aboutUsText}
                    </Typography>
                </Grid2>
            </Grid2>
        </PageSection>
    );
};

export default AboutUsSection;
