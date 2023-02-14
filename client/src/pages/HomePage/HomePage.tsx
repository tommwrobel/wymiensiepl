import { useContext } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import Footer from "../../components/Footer/Footer";
import HelloSection from "../../components/HelloSection/HelloSection";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import { AuthContext } from "../../context/AuthContext";

const HomePage = (): JSX.Element => {const { isLoggedUser } = useContext(AuthContext);

    return (
        <>
            {isLoggedUser() ? <HelloSection /> : <HeroSection />}
            <InstructionsSection />
            <StatisticsSection />
            <AboutUsSection />
            <Footer />
        </>
    );
};

export default HomePage;
