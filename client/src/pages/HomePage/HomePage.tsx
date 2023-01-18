import { useEffect, useState } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InstructionsSection from "../../components/InstructionSection/InstructionsSection";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import { setUser } from "../../features/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

const HomePage = (): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const isLoggedUser = () => {
        return Boolean(user.name && user.role && user.token);
    };

    useEffect(() => {
        dispatch(setUser(user));
    }, [dispatch, user]);

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
            {!isLoggedUser() && (
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

            <AddBookModal
                isOpen={isAddBookModalOpen}
                onClose={handleCloseAddBookModal}
            />
        </>
    );
};

export default HomePage;
