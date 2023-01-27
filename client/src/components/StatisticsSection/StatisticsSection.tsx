import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import commonClasses from "../../common/App.module.css";
import PageSection from "../PageSection/PageSection";
import { useTranslation } from "react-i18next";
import { useGetStatisticsQuery } from "../../api/statisticsApi";
import { useEffect, useState } from "react";

const StatisticsSection = (): JSX.Element => {
    const { t } = useTranslation();

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfBooks, setNumberOfBooks] = useState(0);

    const statisticsQuery = useGetStatisticsQuery();

    useEffect(() => {
        if (statisticsQuery.isSuccess && statisticsQuery.data) {
            setNumberOfUsers(statisticsQuery.data.numberOfUsers);
            setNumberOfBooks(statisticsQuery.data.numberOfBooks);
        }
    }, [statisticsQuery.data, statisticsQuery.isSuccess]);

    return (
        <PageSection>
            <Grid2 container gap={3} direction="column" alignItems="center">
                <Typography variant="h2" textAlign="center">
                    {numberOfUsers === 0 || numberOfBooks === 0 ? (
                        <>
                            {t("SECTIONS.STATISTICS.RECOMMEND_US_1")}
                            <br />
                            {t("SECTIONS.STATISTICS.RECOMMEND_US_2")}
                        </>
                    ) : (
                        <>
                            {t("SECTIONS.STATISTICS.BODY_1")}{" "}
                            <span
                                className={commonClasses.primaryColorBolderText}
                            >
                                {numberOfUsers}
                            </span>{" "}
                            {t("SECTIONS.STATISTICS.BODY_2")}
                            <br />
                            {t("SECTIONS.STATISTICS.BODY_3")}{" "}
                            <span
                                className={commonClasses.primaryColorBolderText}
                            >
                                {numberOfBooks}
                            </span>{" "}
                            {numberOfBooks % 10 > 1 && numberOfBooks % 10 < 5
                                ? t("SECTIONS.STATISTICS.BODY_4_2")
                                : t("SECTIONS.STATISTICS.BODY_4_1")}
                        </>
                    )}
                </Typography>
                <Grid2>
                    <Button variant="contained" color="secondary">
                        {t("SECTIONS.STATISTICS.RECOMMEND_ON_FACEBOOK")}
                    </Button>
                </Grid2>
            </Grid2>
        </PageSection>
    );
};

export default StatisticsSection;
