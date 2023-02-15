import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { customColors } from "../../config/theme";
import { AuthContext } from "../../context/AuthContext";
import PageSection from "../PageSection/PageSection";

const SearchBarSection = (): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
        <PageSection background="darkGrey" padding="45px 15px">
            <Grid2 container alignContent="center" spacing={12}>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2} xs>
                    <TextField /><Button variant="contained">{t("COMMON.SEARCH_ACTION")}</Button>
                    <Typography variant="h3" color={customColors.white} textAlign="center">
                        {t("PAGES.LIBRARY.TITLE", {bookCount: 123})}
                    </Typography>
                </Grid2>
            </Grid2>
        </PageSection>
    );
};

export default SearchBarSection;
