import { getData, putData } from "./rest-api-helper";

export async function getCustomerService({ userId }) {
    try {
        const details = {
            urlPath: `/customer/${userId}`,
        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}

export async function putCustomerService({ userId, custName }) {

    try {
        const details = {
            urlPath: `/customer`,
            body: {
                userId, custName
            }
        };
        const res = await putData(details);
        return res;
    } catch (error) {
        return error;
    }

}