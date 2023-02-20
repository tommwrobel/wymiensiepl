import { useTranslation } from "react-i18next";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import LibrarySection from "../../components/LibrarySection/LibrarySection";

const LibraryPage = (): JSX.Element => {
  const { t } = useTranslation();
  
  return (
    <>
      <LibrarySection title={t("PAGES.LIBRARY.ALL_BOOKS_TITLE").toString()} />
      <AboutUsSection />
    </>
  );
}

export default LibraryPage;
