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

export interface Token {
    body: string,
    expirationTime: number,
}
