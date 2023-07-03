import { postData } from "./rest-api-helper"

export async function getDealOfTheDay(page, limit) {
    const details = {
        urlPath: `/customer/stockByType?Page=${page || 1}&limit=${limit || 10}`,
        body: { type: "deal_of_the_day" }
    }

    const res = await postData(details);
    console.log(res, "---------------getDealOfTheDay");
    return res.data;
}
export async function getStockByType(type, page, limit) {
    const details = {
        urlPath: `/customer/stockByType?Page=${page || 1}&limit=${limit || 10}`,
        body: { type: type }
    }

    const res = await postData(details);
    console.log(res, `---------------get${type}`);
    return res.data;
}
