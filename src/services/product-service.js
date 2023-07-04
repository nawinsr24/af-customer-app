import { postData, getData, deleteData } from "./rest-api-helper";

export async function getProductData(stock_id) {
    try {
        const details = {
            urlPath: `/customer/getStock/${stock_id}`
        }

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return;
    }

}
