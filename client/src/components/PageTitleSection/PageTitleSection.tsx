import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode } from "react";
import { customColors } from "../../config/theme";
import PageSection from "../PageSection/PageSection";

interface PageTitleSectionProps {
    startContent?: ReactNode | string;
    centerContent?: ReactNode | string;
    endContent?: ReactNode | string;
}

const PageTitleSection = ({
    startContent,
    centerContent,
    endContent,
}: PageTitleSectionProps): JSX.Element => {
    return (
        <PageSection background="darkGrey" padding="45px 15px">
            <Grid container justifyContent="space-between" spacing={2}>
                <Grid justifySelf="flex-start">
                    {typeof startContent === "string" ? (
                        <Typography
                            variant="h3"
                            color={customColors.white}
                            textAlign="left"
                        >
                            {startContent}
                        </Typography>
                    ) : (
                        startContent
                    )}
                </Grid>

                <Grid justifySelf="center">
                    {typeof centerContent === "string" ? (
                        <Typography
                            variant="h3"
                            color={customColors.white}
                            textAlign="left"
                        >
                            {centerContent}
                        </Typography>
                    ) : (
                        centerContent
                    )}
                </Grid>

                <Grid justifySelf="flex-end">
                    {typeof endContent === "string" ? (
                        <Typography
                            variant="h3"
                            color={customColors.white}
                            textAlign="left"
                        >
                            {endContent}
                        </Typography>
                    ) : (
                        endContent
                    )}
                </Grid>
            </Grid>
        </PageSection>
    );
};

export default PageTitleSection;
