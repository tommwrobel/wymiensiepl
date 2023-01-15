import { useState } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionSection from "../../components/InstructionSection/InstructionSection";
import LoginModal from "../../components/LoginModal/LoginModal";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";

const HomePage = (): JSX.Element => {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleOpenLoginModal = () => {
        setIsLoginModalOpen(true);
    }

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    return (
        <>
            <ApplicationBar openLoginModal={handleOpenLoginModal} />
            <HeroSection />
            <InstructionSection />
            <StatisticsSection />
            <AboutUsSection />
            <Footer />

            <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal}/>
        </>
    );
};

export default HomePage;
