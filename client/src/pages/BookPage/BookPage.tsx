import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import BookSection from "../../components/BookSection/BookSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";

const BookPage = (): JSX.Element => {
    return (
        <>
            <BookSection />
            <InstructionsSection />
            <AboutUsSection />
        </>
    );
};

export default BookPage;
