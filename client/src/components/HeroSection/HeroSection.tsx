import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { theme } from "../../config/theme";
import commonClasses from "../../common/App.module.css";
import classes from "./HeroSection.module.css";
import PageSection from "../PageSection/PageSection";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const HeroSection = (): JSX.Element => {
    const { t } = useTranslation();
    const isImageVisible = useMediaQuery(theme.breakpoints.up("md"));
    const { openModal } = useContext(ModalContext);

    return (
        <PageSection>
            <Grid2 container alignContent="center" spacing={12}>
                <Grid2 className={classes.heroTextContent} md={6} xs={12}>
                    <Typography
                        variant="h1"
                        textAlign={isImageVisible ? "left" : "center"}
                    >
                        {t("SECTIONS.HERO.TITLE")}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        textAlign={isImageVisible ? "left" : "center"}
                    >
                        {t("SECTIONS.HERO.SUBTITLE")}
                    </Typography>
                    <Grid2
                        container
                        gap={1}
                        justifyContent={
                            isImageVisible ? "flex-start" : "center"
                        }
                    >
                        <Button
                            variant="outlined"
                            onClick={() => openModal("LOGIN_MODAL")}
                        >
                            {t("COMMON.LOGIN_ACTION")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => openModal("REGISTER_MODAL")}
                        >
                            {t("COMMON.REGISTER_ACTION")}
                        </Button>
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
