import { RegisterFormData } from "../lib/types"

export async function registerUser(data: RegisterFormData) {
    try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, 
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        const result = await res.json();
        if(!res.ok) {
            throw new Error(result.message || "Registration failed");
        }
        
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function loginUser(data: RegisterFormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        }
    )
}