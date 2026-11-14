export interface Users {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: string;
    initials: string;
}

export interface CurrentUser {
    id: number;
    name: string;
    email: string;
    role: string;
    initials: string;
}
