import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useGetUserQuery } from "../../api/usersApi";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import LibrarySection from "../../components/LibrarySection/LibrarySection";
import { Maybe } from "../../models/app.models";

const UserLibraryPage = (): JSX.Element => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const [userName, setUserName] = useState<Maybe<string>>();

    const getUserQuery = useGetUserQuery({ userId: userId as string });

    useEffect(() => {
        if (getUserQuery.isSuccess && getUserQuery.data) {
            setUserName(getUserQuery.data.name);
        }
    }, [getUserQuery.isSuccess, getUserQuery.data]);

    return (
        <>
            <LibrarySection
                title={t("PAGES.LIBRARY.USER_BOOKS_TITLE", {
                    userName,
                }).toString()}
                initialFilters={{ userId }}
            />
            <InstructionsSection />
            <AboutUsSection />
        </>
    );
};

export default UserLibraryPage;
