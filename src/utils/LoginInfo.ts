import { jwtDecode } from "jwt-decode";
interface UserInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
export const getLoginInfo = (): UserInfo | null => {
    const token = localStorage.getItem("token");
    if (token != null) {
        const userInfo: UserInfo = jwtDecode(token);
        return userInfo;
    } else {
        return null;
    }
};