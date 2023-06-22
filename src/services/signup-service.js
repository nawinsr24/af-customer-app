import { isEmail } from "../utils/format";
import { postData } from "./rest-api-helper"

export async function signupService({ username }) {
    const isEmailBool = isEmail(username);
    const details = {
        urlPath: "/customer/signup",
        body: {
            ...(isEmailBool && { email: username }),
            ...(!isEmailBool && { mobile: username })
        }
    }
console.log(details)
    const res = await postData(details);
    console.log(res, "---------------signupService");
    return res;
}

export async function verifyCustOtpService({ otp, username, custName, password }) {
    const details = {
        urlPath: `/customer/verifyotp/${otp}`,
        body: {
            username, custName, password
        }
    }

    const res = await postData(details);
    console.log(res, "---------------verifyCustOtpService");
    return res;
}