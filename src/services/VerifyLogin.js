import { BASE_URL } from "../constants/BaseUrl";

export async function verifyLogin() {
    try {
        const res = await fetch(`${BASE_URL}/business/logged`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            return false;
        }

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
