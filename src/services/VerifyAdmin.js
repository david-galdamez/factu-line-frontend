import { BASE_URL } from "../constants/BaseUrl";

export async function verifyAdminStatus() {
    try {
        const res = await fetch(`${BASE_URL}/business/admin`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            return false;
        }

        const data = await res.json();

        return data.is_admin;
    } catch {
        return false;
    }
}
