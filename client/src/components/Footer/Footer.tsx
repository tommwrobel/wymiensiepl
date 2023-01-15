import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { translationPl } from "../../common/constants";
import PageSection from "../PageSection/PageSection";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import Grid2 from "@mui/material/Unstable_Grid2";
import { theme } from "../../config/theme";

const Footer = (): JSX.Element => {

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <PageSection padding="15px 15px">
            <Grid2 container justifyContent={isSmallScreen ? "center" : "space-between"} alignItems="center">
                <Grid2>
                    <Typography textAlign={isSmallScreen ? "center" : "left"}>
                        &copy; {translationPl.copyright}
                    </Typography>
                </Grid2>
                <Grid2 justifyContent={isSmallScreen ? "center" : "flex-end"}>
                    <IconButton>
                        <ArrowUpwardOutlinedIcon />
                    </IconButton>
                </Grid2>
            </Grid2>
        </PageSection>
    );
}

export default Footer;
