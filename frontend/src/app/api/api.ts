import api from "./axios";

export async function fetchUserData() {
    try {
        const response = await api.get('/me',{
            headers: {
                Accept: "application/json",
            }}
        );
        return response.data;
    }catch (err) {
        console.error("Failed to fetch uer data", err);
    }

}