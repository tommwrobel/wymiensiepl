import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import LibrarySection from "../../components/LibrarySection/LibrarySection";
import { AuthContext } from "../../context/AuthContext";

const MyLibraryPage = (): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
        <>
            <LibrarySection
                title={t("PAGES.LIBRARY.MY_BOOKS_TITLE").toString()}
                initialFilters={{ userId: user?.id }}
            />
            <InstructionsSection />
            <AboutUsSection />
        </>
    );
};

export default MyLibraryPage;
