import { postData, getData, deleteData } from "./rest-api-helper";

export async function getDealOfTheDay(page, limit) {
    try {
        const details = {
            urlPath: `/customer/stockByType?Page=${page || 1}&limit=${limit || 10}`,
            body: { type: "deal_of_the_day" }
        };

        const res = await postData(details);
        console.log(res, "---------------getDealOfTheDay");
        return res.data;
    } catch (error) {
        return error;
    }

}

export async function getStockByType(type, page, limit) {
    try {
        const details = {
            urlPath: `/customer/stockByType?Page=${page || 1}&limit=${limit || 10}`,
            body: { type: type }
        };

        const res = await postData(details);
        console.log(res, `---------------get${type}`);
        return res.data;
    } catch (error) {
        return;
    }

}

export async function addToCart(data) {
    try {
        const details = {
            urlPath: `/customer/addtocart`,
            body: data
        };
        const res = await postData(details);
        return res;
    } catch (error) {
        return error;
    }
}

export async function getCart(user_id) {
    try {
        const details = {
            urlPath: `/customer/cart/${user_id}`,
        };
        const res = await getData(details);
        return res.data;
    } catch (error) {
        console.log("ERROR", error);
        return;
    }

}
export async function deleteCart(user_id, cart_id) {
    try {
        const details = {
            urlPath: `/customer/cart/?user_id=${user_id}&cart_id=${cart_id}`,
        };
        const res = await deleteData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}
