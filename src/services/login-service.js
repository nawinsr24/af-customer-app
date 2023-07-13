import { postData } from "./rest-api-helper";

export async function loginService({ username, password }) {
    try {
        const details = {
            urlPath: "/customer/login",
            body: {
                username, password
            }
        };

        const res = await postData(details);
        return res.data;
    } catch (error) {
        throw error;
    }

}
export async function socialLogin(data) {
    try {
        const details = {
            urlPath: "/customer/socialLogin",
            body: data
        };

        const res = await postData(details);
        return res.data;
    } catch (error) {
        throw error;
    }

}
