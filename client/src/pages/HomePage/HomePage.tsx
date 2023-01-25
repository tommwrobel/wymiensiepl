import { useContext, useState } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import SearchSection from "../../components/SearchSection/SearchSection";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import { AuthContext } from "../../context/AuthContext";

const HomePage = (): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const { isLoggedUser, user } = useContext(AuthContext);

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

    const handleOpenAddBookModal = () => {
        setIsAddBookModalOpen(true);
    };

    const handleCloseAddBookModal = () => {
        setIsAddBookModalOpen(false);
    };

    return (
        <>
            <ApplicationBar
                openLoginModal={handleOpenLoginModal}
                openRegistrationModal={handleOpenRegistratonModal}
                openAddBookModal={handleOpenAddBookModal}
            />
            {isLoggedUser() ? (
                <SearchSection />
            ) : (
                <HeroSection
                    onLogin={handleOpenLoginModal}
                    onRegister={handleOpenRegistratonModal}
                />
            )}
            <InstructionsSection />
            <StatisticsSection />
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

            {isLoggedUser() && user && (
                <AddBookModal
                    userId={user.id}
                    isOpen={isAddBookModalOpen}
                    onClose={handleCloseAddBookModal}
                />
            )}
        </>
    );
};

export default HomePage;
