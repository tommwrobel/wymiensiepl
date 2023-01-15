import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { translationPl } from "../../common/constants";
import commonClasses from "../../common/App.module.css";
import PageSection from "../PageSection/PageSection";

interface StatisticsSectionProps {
    userCount: number;
    bookCount: number;
}

const StatisticsSection = ({
    userCount,
    bookCount,
}: StatisticsSectionProps): JSX.Element => {
    return (
        <PageSection>
            <Grid2 container gap={3} direction="column" alignItems="center">
                <Typography variant="h2" textAlign="center">
                    {translationPl.statisticsText[0]}{" "}
                    <span className={commonClasses.primaryColorBolderText}>
                        {userCount}
                    </span>{" "}
                    {translationPl.statisticsText[1]}
                    <br />
                    {translationPl.statisticsText[2]}{" "}
                    <span className={commonClasses.primaryColorBolderText}>
                        {bookCount}
                    </span>{" "}
                    {translationPl.statisticsText[3]}
                </Typography>
                <Grid2>
                    <Button variant="contained" color="secondary">{translationPl.facebook}</Button>
                </Grid2>
            </Grid2>
        </PageSection>
    );
};

export default StatisticsSection;
