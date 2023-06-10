import { getData, putData } from "./rest-api-helper"

export async function getDDCities(txt) {

    if (!txt)
        return []

    const details = {
        urlPath: "/services/cities/" + txt
    }

    const res = await getData(details);
    console.log(res, "---------------getDDCities");
    return res || [];
}


export async function getDistance({ fromId, toId }) {

    if (!fromId || !toId)
        return []

    const details = {
        urlPath: "/services/distance",
        queryParams: { fromId, toId }
    }

    const res = await getData(details);
    console.log(res, "---------------getDistance");
    return res;
}

export async function getRcDetails({ regNo }) {
    const details = {
        urlPath: "/services/verifyRC/" + regNo,
    }

    const res = await getData(details);
    console.log(res, "---------------getRcDetails");
    return res;
}

export async function putAdrVerify(custId, status) {
    const details = {
        urlPath: `/services/aadhaarVerify`,
        queryParams: {
            custId, status
        }
    }
    const res = await putData(details);
    console.log(res + "---------------putAdrVerify");
    return res;
}

export async function getPendingAdrVfyByUser({ userId }) {
    const details = {
        urlPath: `/services/getPendingAdrVfyByUser/${userId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getPendingAdrVfyByUser");
    return res;
}

export async function getAllPendingAdrVfy() {
    const details = {
        urlPath: `/services/aadhaarVerify`
    }

    const res = await getData(details);
    console.log(res, "---------------getAllPendingAdrVfy");
    return res || [];
}