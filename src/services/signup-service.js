import { isEmail } from "../utils/format";
import { postData } from "./rest-api-helper"

export async function signupService({ username }) {
    try {
        const isEmailBool = isEmail(username);
        const details = {
            urlPath: "/customer/signup",
            body: {
                ...(isEmailBool && { email: username }),
                ...(!isEmailBool && { mobile: username })
            }
        }
        const res = await postData(details);
        return res;
    } catch (error) {
        return;
    }

}

export async function verifyCustOtpService({ otp, username, custName, password }) {
    try {
        const details = {
            urlPath: `/customer/verifyotp/${otp}`,
            body: {
                username, custName, password
            }
        }

        const res = await postData(details);
        console.log(res, "---------------verifyCustOtpService");
        return res;
    } catch (error) {
        return;
    }

}