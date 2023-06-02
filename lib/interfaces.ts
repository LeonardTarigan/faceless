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

export interface Message {
    id: string;
    text: string;
    timestamp: string;
}

export interface ConfirmationDialog {
    isOpen: boolean;
    currentId: string;
    setOpenDialog: Function;
    setFetchStatus: Function;
}
