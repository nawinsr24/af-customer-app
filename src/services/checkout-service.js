import axios from "axios";
import { postData, getData, deleteData } from "./rest-api-helper";
export async function getAddress(user_id) {
    try {
        const details = {
            urlPath: `/customer/address/?user_id=${user_id}`
        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}

export async function getDeliveryCharge(pin_code) {
    try {
        const details = {
            urlPath: `/del/calculateCharge/?d_pin=${pin_code}`
        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}

export async function addAddress(data) {
    try {
        const details = {
            urlPath: `/customer/address`,
            body: data
        };

        const res = await postData(details);
        return res.data;
    } catch (error) {
        throw error;
    }

}

export async function postOrder(data) {
    try {
        const details = {
            urlPath: `/customer/order`,
            body: data
        };

        const res = await postData(details);
        return res.data;
    } catch (error) {
        throw error;
    }

}
export async function getOrder(data) {
    try {
        const details = {
            urlPath: `/customer/order/?customer_id=${data.customer_id}&order_id=${data.order_id}`,

        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}
export async function trackOrder(awb) {
    try {
        const details = {
            urlPath: `/del/trackOrder/?awb=${awb}`,

        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}

export async function getAirpay(data) {
    try {

        const base_url = axios.defaults.baseURL;
        const urlPath = `/sendtoairpay/?customer_id=${data.customer_id}&payable_amount=${data.payable_amount}&address_id=${data.address_id}&order_id=${data.order_id} `;
        window.open(base_url + urlPath, "_self");

    } catch (error) {
        return error;
    }

}
