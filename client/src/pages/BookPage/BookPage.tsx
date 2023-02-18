import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import PageSection from "../../components/PageSection/PageSection";

const BookPage = (): JSX.Element => {
    return (
        <>
            <PageSection>
                Book page
            </PageSection>
            <InstructionsSection />
            <AboutUsSection />
        </>
    );
}

export default BookPage;
