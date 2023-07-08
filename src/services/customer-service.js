import { getData, putData } from "./rest-api-helper";

export async function getCustomerService({ userId }) {
    try {
        const details = {
            urlPath: `/customer/${userId}`,
        };

        const res = await getData(details);
        console.log(res, "---------------getCustomerService");
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
        console.log(details);
        const res = await putData(details);
        console.log(res, "---------------putCustomerService");
        return res;
    } catch (error) {
        return error;
    }

}