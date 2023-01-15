import { useState } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
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
            <InstructionsSection />
            <StatisticsSection userCount={123} bookCount={334} />
            <AboutUsSection />
            <Footer />

            <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal}/>
        </>
    );
};

export default HomePage;
