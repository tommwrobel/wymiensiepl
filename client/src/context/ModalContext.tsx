import { createContext, ReactNode, useState } from "react";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import ExchangeBookModal, {
    ExchangeBookModalProps,
} from "../components/ExchangeBookModal/ExchangeBookModal";
import LoginModal from "../components/LoginModal/LoginModal";
import RegisterModal from "../components/RegisterModal/RegisterModal";
import { ModalProps } from "../models/app.models";

type AppModalKey =
    | "LOGIN_MODAL"
    | "REGISTER_MODAL"
    | "ADD_BOOK_MODAL"
    | "EXCHANGE_BOOK_MODAL";

interface ModalItem {
    Component: <T extends ModalProps>(props: T) => JSX.Element;
    key: AppModalKey;
    isOpen: boolean;
    props?: any;
}

export interface ModalContextProps {
    modals: ModalItem[];
    openModal: (key: AppModalKey, props?: any) => void;
    closeModal: (key: AppModalKey) => void;
}

export const ModalContext = createContext<ModalContextProps>({
    modals: [],
    openModal: (key: AppModalKey, props?: any) => {},
    closeModal: (key: AppModalKey) => {},
});

interface ModalContextProviderProps {
    children?: ReactNode;
}

const appModals: ModalItem[] = [
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
    {
        Component: ExchangeBookModal,
        key: "EXCHANGE_BOOK_MODAL",
        isOpen: false,
    },
];

export const ModalContextProvider = ({
    children,
}: ModalContextProviderProps): JSX.Element => {
    const [modals, setModals] = useState<ModalItem[]>(appModals);

    const handleOpenModal = (key: AppModalKey, customProps?: any) => {
        setModals((modals) =>
            modals.map((modal) =>
                modal.key === key
                    ? {
                          ...modal,
                          isOpen: true,
                          props: customProps
                              ? (customProps as typeof modal.Component)
                              : undefined,
                      }
                    : modal
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
                        {...modal.props}
                    />
                ) : null
            )}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
