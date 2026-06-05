import axios from "axios";
import { codeVerificationData, LoginFormData, RegisterFormData } from "../lib/types"
import api from "./axios";

export async function registerUser(data: RegisterFormData) {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    try{
        const response = await api.post("/register", data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

export async function loginUser(data: LoginFormData) {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    try {
        const response =  await api.post("/login", data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function codeVerification(data: codeVerificationData) {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    const response = await api.post("/verifyCode", data);

    return response.data;

}

export async function handleLogout() {
    try {
        await api.post("/logout");
        // window.location.href = "login";
    } catch(err) {
        console.error("logout failed:", err);
    }
};