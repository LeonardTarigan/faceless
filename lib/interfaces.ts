import { ReactNode } from 'react';

export interface CustomableIcon {
    className?: string;
}

export interface MainLayout {
    children: ReactNode;
    title: string;
}

export interface User {
    uid: string | null;
    email: string | null;
    username: string | null;
    imageUrl: string;
}
