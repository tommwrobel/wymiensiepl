import { useState } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";

const HomePage = (): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleOpenLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleOpenRegistratonModal = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegistratonModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <>
            <ApplicationBar
                openLoginModal={handleOpenLoginModal}
                openRegistrationModal={handleOpenRegistratonModal}
            />
            <HeroSection />
            <InstructionsSection />
            <StatisticsSection userCount={123} bookCount={334} />
            <AboutUsSection />
            <Footer />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleCloseLoginModal}
                onRegister={handleOpenRegistratonModal}
            />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={handleCloseRegistratonModal}
                onLogin={handleOpenLoginModal}
            />
        </>
    );
};

export default HomePage;
