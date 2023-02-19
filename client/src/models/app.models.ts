export type UserRole = "ADMIN" | "USER";
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface Book {
    id: string;
    userId: string;
    title: string;
    author: string;
    description?: string;
    publicationYear?: number;
    numberOfPages?: number;
    coverPhoto?: string;
}

export interface BooksFilters {
    searchText?: string;
    userId?: string;
    page?: number;
    size?: number
}

export type FilterName = keyof BooksFilters;

export interface Token {
    body: string,
    expirationTime: number,
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PageInfo {
    totalPages: number;
    totalElements: number;
    currentPage: number;
    numberOfElements: number;
}

export interface PagedResponse<T> {
    body: T[];
    pageInfo: PageInfo;
}
