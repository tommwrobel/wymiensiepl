import { createContext, ReactNode, useState } from "react";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import LoginModal from "../components/LoginModal/LoginModal";
import RegisterModal from "../components/RegisterModal/RegisterModal";
import { ModalProps } from "../models/app.models";

type AppModalKey = "LOGIN_MODAL" | "REGISTER_MODAL" | "ADD_BOOK_MODAL";

interface ModalItem {
    Component: (props: ModalProps) => JSX.Element;
    key: AppModalKey;
    isOpen: boolean;
}

export interface ModalContextProps {
    modals: ModalItem[];
    openModal: (key: string) => void;
    closeModal: (key: string) => void;
}

export const ModalContext = createContext<ModalContextProps>({
    modals: [],
    openModal: (key: string) => {},
    closeModal: (key: string) => {},
});

interface ModalContextProviderProps {
    children?: ReactNode;
}

const appModals: ModalItem[]  = [
    {
        Component: LoginModal,
        key: "LOGIN_MODAL",
        isOpen: false,
    },
    {
        Component: RegisterModal,
        key: "REGISTER_MODAL",
        isOpen: false,
    },
    {
        Component: AddBookModal,
        key: "ADD_BOOK_MODAL",
        isOpen: false,
    },
];

export const ModalContextProvider = ({
    children,
}: ModalContextProviderProps): JSX.Element => {
    const [modals, setModals] = useState<ModalItem[]>(appModals);

    const handleOpenModal = (key: string) => {
        setModals((modals) =>
            modals.map((modal) =>
                modal.key === key ? { ...modal, isOpen: true } : modal
            )
        );
    };

    const handleCloseModal = (key: string) => {
        setModals((modals) =>
            modals.map((modal) =>
                modal.key === key ? { ...modal, isOpen: false } : modal
            )
        );
    };

    return (
        <ModalContext.Provider
            value={{
                modals: modals,
                openModal: handleOpenModal,
                closeModal: handleCloseModal,
            }}
        >
            {children}
            {modals.map((modal) =>
                modal.isOpen ? (
                    <modal.Component
                        key={modal.key}
                        isOpen={modal.isOpen}
                        onClose={() => handleCloseModal(modal.key)}
                    />
                ) : null
            )}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
