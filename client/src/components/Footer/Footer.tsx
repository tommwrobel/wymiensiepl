import { IconButton, Typography, useMediaQuery } from "@mui/material";
import PageSection from "../PageSection/PageSection";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import Grid2 from "@mui/material/Unstable_Grid2";
import { theme } from "../../config/theme";
import { useTranslation } from "react-i18next";

const Footer = (): JSX.Element => {

    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <PageSection padding="15px 15px">
            <Grid2 container justifyContent={isSmallScreen ? "center" : "space-between"} alignItems="center">
                <Grid2>
                    <Typography textAlign={isSmallScreen ? "center" : "left"}>
                        &copy; {t("SECTIONS.FOOTER.COPYRIGHTS", {currentYear: 2023})}
                    </Typography>
                </Grid2>
                <Grid2 justifyContent={isSmallScreen ? "center" : "flex-end"}>
                    <IconButton href="#top">
                        <ArrowUpwardOutlinedIcon />
                    </IconButton>
                </Grid2>
            </Grid2>
        </PageSection>
    );
}

export default Footer;
