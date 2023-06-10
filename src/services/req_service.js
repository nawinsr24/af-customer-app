import { getData, postData, putData } from "./rest-api-helper";

export async function getAllCurrCustReq() {
    const details = {
        urlPath: "/request",
        queryParams: { user: 'bo', time: "current", reqType: "cust" }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCurrCustReq");
    return res ? res : [];
}

export async function getAllCurrCustReqWPag(limit, offset, order) {
    console.log(limit, offset);
    const details = {
        urlPath: "/request",
        queryParams: { user: 'bo', time: "current", reqType: "cust", limit, offset, order }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCurrCustReqWPag");
    return res ? res : [];
}



export async function getAllCurrTrkOpReq() {
    const details = {
        urlPath: "/request",
        queryParams: { user: 'bo', time: "current", reqType: "trkOp" }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCurrTrkOpReq");
    return res ? res : [];
}

export async function getAllCurrTrkOpReqWPag(limit, offset, order) {
    console.log(limit, offset);
    const details = {
        urlPath: "/request",
        queryParams: { user: 'bo', time: "current", reqType: "trkOp", limit, offset, order }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCurrTrkOpReqWPag");
    return res ? res : [];
}

export async function getAllCurrTrkOpReqWPagSrch(limit, offset, searchKeyWord, searchType, order) {
    console.log(limit, offset);
    const details = {
        urlPath: "/request",
        queryParams: { user: 'bo', time: "current", reqType: "trkOp", limit, offset, searchKeyWord, searchType, order }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCurrTrkOpReqWPagSrch");
    return res ? res : [];
}

export async function postCustReq(data) {
    const details = {
        urlPath: "/request/cust",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------postCustReq");
    return res;
}

export async function getSingleCustReq(custReqId) {
    const details = {
        urlPath: "/request/cust/" + custReqId
    }

    const res = await getData(details);
    console.log(res + "---------------getSingleCustReq");
    return res;
}


export async function putCustReq(data) {
    const details = {
        urlPath: "/request/cust/" + data.custReqId,
        body: {
            custId: data.custId,
            type: data.type,
            cnorName: data.cnorName,
            picLocation: data.picLocation,
            picAddress: data.picAddress,
            cneeName: data.cneeName,
            delLocation: data.delLocation,
            delAddress: data.delAddress,
            picDate: data.picDate,
            delDate: data.delDate,
            matType: data.matType,
            matLength: data.matLength,
            matWidth: data.matWidth,
            matHeight: data.matHeight,
            matDimsUnit: data.matDimsUnit,
            matNature: data.matNature,
            loadDesc: data.loadDesc,
            quantity: data.quantity,
            weight: data.weight,
            weightUnit: data.weightUnit,
            preTruckTypes: data.preTruckTypes,
            loadType: data.loadType,
            estPrice: data.estPrice,
            payType: data.payType,
            cnorMobile: data.cnorMobile,
            cnorEmail: data.cnorEmail,
            cneeMobile: data.cneeMobile,
            cneeEmail: data.cneeEmail
        }
    }

    const res = await putData(details);
    console.log(res, "---------------putCustReq");
    return res;
}

export async function postTrkOpReq(data) {
    const details = {
        urlPath: "/request/truckOp",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------postTrkOpReq");
    return res;
}

export async function getSingleTrkOpReq(trkOpReqId) {
    const details = {
        urlPath: "/request/truckOp/" + trkOpReqId
    }

    const res = await getData(details);
    console.log(res + "---------------getSingleTrkReq");
    return res;
}

export async function putTrkOpReq(data) {
    const details = {
        urlPath: "/request/truckOp/" + data.trkOpReqId,
        body: {
            truckopId: data.truckopId,
            truckId: data.truckId,
            loadStatus: data.loadStatus,
            addableCap: data.addableCap,
            capUnit: data.capUnit,
            currLocation: data.currLocation,
            description: data.description,
            estPrice: data.estPrice,
            routesArr: data.routesArr,
        }
    }

    const res = await putData(details);
    console.log(res, "---------------putTrkOpReq");
    return res;
}

export async function putTrkOpReqPricing({ trkOpReqId, data }) {
    const details = {
        urlPath: "/request/truckOp/" + trkOpReqId,
        body: {
            ...data
        }
    }

    const res = await putData(details);
    console.log(res, "---------------putTrkOpReqPricing");
    return res;
}

export async function postTrkOpPymt({ trkOpReqId, body }) {
    const details = {
        urlPath: `/request/trkOpPymt`,
        body: {
            truckOpReqId: trkOpReqId,
            ...body
        }
    }

    const res = await postData(details);
    console.log(res + "---------------postTrkOpPymt");
    return res;
}

// export async function getAllCurrCustReqWPagSrch(limit, offset, searchKeyWord, searchType, order) {
//     console.log(limit, offset);
//     const details = {
//         urlPath: "/request",
//         queryParams: { user: 'bo', time: "current", reqType: "cust", limit, offset, searchKeyWord, searchType, order }
//     }

//     const res = await getData(details);
//     console.log(res + "---------------getAllCurrCustReqWPagSrch");
//     return res ? res : [];
// }


export async function getAllCustReqWPagSrch({ limit, pageNumber, searchKeyWord, searchType, order, time }) {
    let queryParamsObj = {
        user: 'bo',
        time: time,
        reqType: "cust",
        ...(searchKeyWord && { searchKeyWord }),
        ...(searchType && { searchType }),
        order
    }

    const details = {
        urlPath: "/request",
        queryParams: {
            ...queryParamsObj,
            limit,
            offset: (pageNumber * limit) - limit,

        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/request",
        queryParams: {
            ...queryParamsObj,
            limit: 100000000000000,
            offset: 0,
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllCurrCustReqWPagSrch");
    console.log({ limit, pageNumber, searchKeyWord, searchType, order })
    return {
        totalLength: res2 ? res2?.length : 0,
        data: res ? res : []
    }
}


// export async function getAllCurrTrkOpReqWPagSrch(limit, offset, searchKeyWord, searchType, order) {
//     console.log(limit, offset);
//     const details = {
//         urlPath: "/request",
//         queryParams: { user: 'bo', time: "current", reqType: "trkOp", limit, offset, searchKeyWord, searchType, order }
//     }

//     const res = await getData(details);
//     console.log(res + "---------------getAllCurrTrkOpReqWPagSrch");
//     return res ? res : [];
// }


export async function getAllTrkOpReqWPagSrch({ limit, pageNumber, searchKeyWord, searchType, order, time }) {
    let queryParamsObj = {
        user: 'bo',
        time: time,
        reqType: "trkOp",
        ...(searchKeyWord && { searchKeyWord }),
        ...(searchType && { searchType }),
        order
    }

    const details = {
        urlPath: "/request",
        queryParams: {
            ...queryParamsObj,
            limit,
            offset: (pageNumber * limit) - limit,

        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/request",
        queryParams: {
            ...queryParamsObj,
            limit: 100000000000000,
            offset: 0,
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllTrkOpReqWPagSrch");
    console.log({ limit, pageNumber, searchKeyWord, searchType, order })
    return {
        totalLength: res2 ? res2?.length : 0,
        data: res ? res : []
    }
}

export async function getAllCustReqByTpReqId(trkOpReqId) {
    const details = {
        urlPath: "/request/trkOpMatchingReqs",
        queryParams: { trkOpReqId }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllCustReqByTpReqId");
    return res ? res : [];
}

export async function getAllTpReqByCusReqId(custReqId) {
    const details = {
        urlPath: "/request/custMatchingReqs",
        queryParams: { custReqId }
    }

    const res = await getData(details);
    console.log(res + "---------------getAllTpReqByCusReqId---------------------");
    return res ? res : [];
}

export async function getLogData({ limit, pageNumber, searchKeyWord, searchType, order }) {
    let queryParamsObj = {
        ...(searchKeyWord && { searchKeyWord }),
        ...(searchType && { searchType }),
        order

    }

    const details = {
        urlPath: "/backoffice/log",
        queryParams: {
            ...queryParamsObj,
            limit,
            offset: (pageNumber * limit) - limit,

        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/backoffice/log",
        queryParams: {
            ...queryParamsObj,
            limit: 10000000000,
            offset: 0,
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getLogData");
    console.log({ limit, pageNumber, searchKeyWord, searchType, order })
    return {
        totalLength: res2 ? res2?.length : 0,
        data: res ? res : []
    }
}