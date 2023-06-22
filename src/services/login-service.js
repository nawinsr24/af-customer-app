import { postData } from "./rest-api-helper"

export async function loginService({ username, password }) {
    const details = {
        urlPath: "/customer/login",
        body: {
            username, password
        }
    }

    const res = await postData(details);
    console.log(res, "---------------loginService");
    return res.data;
}
