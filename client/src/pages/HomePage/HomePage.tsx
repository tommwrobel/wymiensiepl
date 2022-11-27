import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionSection from "../../components/InstructionSection/InstructionSection";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";

const HomePage = (): JSX.Element => {
    return (
        <>
            <ApplicationBar title="same title" />
            <HeroSection />
            <InstructionSection />
            <StatisticsSection />
            <AboutUsSection />
            <Footer />
        </>
    );
};

export default HomePage;
