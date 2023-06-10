import { getData, postData, putData } from "./rest-api-helper"

export async function getAllShipmts({ limit, pageNumber, searchKeyWord, searchType, order, time }) {
    let queryParamsObj = {
        user: 'bo',
        time: time,
        ...(searchKeyWord && { searchKeyWord }),
        ...(searchType && { searchType }),
        order
    }

    const details = {
        urlPath: "/shipment",
        queryParams: {
            ...queryParamsObj,
            limit,
            offset: (pageNumber * limit) - limit,

        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/shipment",
        queryParams: {
            ...queryParamsObj,
            limit: 100000000000000,
            offset: 0,
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllShipmts");
    console.log({ limit, pageNumber, searchKeyWord, searchType, order })
    return {
        totalLength: res2 ? res2?.length : 0,
        data: res ? res : []
    }
}

export async function createShipmt(data) {
    const details = {
        urlPath: "/shipment",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------createShipmt");
    return res;
}

export async function getSingleShipmt(shipmtId) {
    const details = {
        urlPath: "/shipment/getSingle/" + shipmtId
    }

    const res = await getData(details);
    console.log(res + "---------------getShipmtInfo");
    return res;
}


export async function putShipmtStatus({ shipmtId, currStatus }) {
    const details = {
        urlPath: `/shipment/updateStatus`,
        queryParams: {
            shipmtId, currStatus
        }
    }

    const res = await putData(details);
    console.log(res + "---------------putShipmtStatus");
    return res;
}

export async function putShipmt({ shipmtId, body }) {
    const details = {
        urlPath: `/shipment/editData/${shipmtId}`,
        body: {
            ...body
        }
    }

    const res = await putData(details);
    console.log(res + "---------------putShipmt");
    return res;
}

export async function putFeedback({ shipmtId, body }) {
    const details = {
        urlPath: `/shipment/feedback/${shipmtId}`,
        body: {
            ...body
        }
    }

    const res = await putData(details);
    console.log(res + "---------------putFeedback");
    return res;
}


export async function sendDataInvalid({ body }) {
    const details = {
        urlPath: `/shipment/dataInvalid`,
        body: {
            ...body
        }
    }

    const res = await postData(details);
    console.log(res + "---------------sendDataInvalid");
    return res;
}

export async function getAllShipmtRepts({ fromDate, toDate, picLoc, delLoc, shipmtTime, status, cust, trkOp, trkRegNo, mat, order, limit, pageNumber }) {

    let queryParamsObj = {
        fromDate, toDate, picLoc, delLoc, shipmtTime, status, cust, trkOp, trkRegNo, mat, order
    }

    console.log({ fromDate, toDate, picLoc, delLoc, shipmtTime, status, cust, trkOp, trkRegNo, mat, order, limit, pageNumber })

    const details = {
        urlPath: "/shipment/shipmtReports",
        queryParams: {
            ...queryParamsObj,
            limit,
            offset: (pageNumber * limit) - limit,

        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/shipment/shipmtReports",
        queryParams: {
            ...queryParamsObj,
            limit: 100000000000000,
            offset: 0,
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllShipmtRepts");
    return {
        totalLength: res2 ? res2?.length : 0,
        data: res ? res : []
    }
}

export async function postCustPymt({ shipmtId, body }) {
    const details = {
        urlPath: `/shipment/custPymt`,
        body: {
            shipmtId,
            ...body
        }
    }

    const res = await postData(details);
    console.log(res + "---------------postCustPymt");
    return res;
}