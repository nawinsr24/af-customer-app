import { postData, putData } from "./rest-api-helper"

export async function loginService(data) {
    const details = {
        urlPath: "/login/staff",
        body: {
            username: data.email,
            password: data.password
        }
    }

    const res = await postData(details);
    console.log(res, "---------------loginService");
    return res;
}

export async function ChangePwdService(data) {
    const details = {
        urlPath: "/password/changeWithOldPwd",
        body: {
            userId: data.userId,
            password: data.password,
            oldPwd: data.old_password
        }
    }

    const res = await putData(details);
    console.log(res, "---------------ChangePwdService");
    return res;
}