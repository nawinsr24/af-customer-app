import { postData, getData } from "./rest-api-helper";

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

export async function addToCart(user_id, data) {
    console.log("ADD CART", user_id, data);
    const details = {
        urlPath: `/customer/addtocart`,
        body: {
            user_id,
            stock_id: data?.stock_id
        }
    }
    const res = await postData(details);
    return res.data;
}
export async function getCart(user_id) {
    const details = {
        urlPath: `/customer/cart/${user_id}`,
    }
    const res = await getData(details);
    return res.data;
}
