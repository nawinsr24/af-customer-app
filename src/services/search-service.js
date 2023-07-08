import { postData, getData, deleteData } from "./rest-api-helper";

export async function searchProduct(data) {
    try {
        const details = {
            urlPath: `/customer/stockSearch/?limit=${100}`,
            body:data
        }

        const res = await postData(details);
        return res.data;
    } catch (error) {
        return;
    }

}
