export type RegisterFormData = {
    userName?: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

export type LoginFormData = {
    email: string;
    password: string;
}

export type codeVerificationData = {
    email: string;
}