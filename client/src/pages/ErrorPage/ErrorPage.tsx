import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PageSection from "../../components/PageSection/PageSection";

const ErrorPage = (): JSX.Element => {
    return (
        <PageSection>
            <Grid container alignContent="center" flexDirection="column">
                <Grid>
                    <img src="/error-image.svg" alt="error" />
                </Grid>
            </Grid>
        </PageSection>
    );
};

export default ErrorPage;
