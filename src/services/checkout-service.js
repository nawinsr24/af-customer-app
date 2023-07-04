import { postData, getData, deleteData } from "./rest-api-helper";

export async function getAddress(user_id) {
    try {
        const details = {
            urlPath: `/customer/address/?user_id=${user_id}`
        }

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return;
    }

}

export async function addAddress(data) {
    try {
        const details = {
            urlPath: `/customer/address`,
            body: data
        }

        const res = await postData(details);
        return res.data;
    } catch (error) {
        return;
    }

}

export async function postOrder(data) {
    try {
        const details = {
            urlPath: `/customer/order`,
            body: data
        }

        const res = await postData(details);
        return res.data;
    } catch (error) {
        return;
    }

}
