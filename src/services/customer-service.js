import { getData, putData } from "./rest-api-helper"

export async function getCustomerService({ userId }) {
    const details = {
        urlPath: `/customer/${userId}`,
    }

    const res = await getData(details);
    console.log(res, "---------------getCustomerService");
    return res.data;
}

export async function putCustomerService({ userId, custName }) {
    const details = {
        urlPath: `/customer`,
        body: {
            userId, custName
        }
    }
    console.log(details)
    const res = await putData(details);
    console.log(res, "---------------putCustomerService");
    return res;
}