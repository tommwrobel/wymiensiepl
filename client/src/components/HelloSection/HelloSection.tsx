import { Avatar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { customColors } from "../../config/theme";
import { AuthContext } from "../../context/AuthContext";
import PageSection from "../PageSection/PageSection";

const HelloSection = (): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
        <PageSection background="darkGrey">
            <Grid2 container alignContent="center" spacing={12}>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2} xs>
                    <Avatar sx={ {backgroundColor: customColors.primary, width: 48, height: 48}}>{user?.name.slice(0,1).toUpperCase()}</Avatar>
                    <Typography variant="h3" color={customColors.white} textAlign="center">
                        {t("COMMON.HELLO_USER", {username: user?.name})}
                    </Typography>
                </Grid2>
            </Grid2>
        </PageSection>
    );
};

export default HelloSection;
