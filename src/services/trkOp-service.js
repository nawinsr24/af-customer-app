import { getData, postData, putData } from "./rest-api-helper";

export async function getAllTrkOp() {
    const details = {
        urlPath: "/truckOp"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllTrkOp");
    return res;
}

export async function putTrkOpStatus(truckOpId, status) {
    const details = {
        urlPath: "/truckOp",
        queryParams: { truckopId: truckOpId, status }
    }
    const res = await putData(details);
    console.log(res + "---------------putTrkOpStatus");
    return res;
}

export async function getSingleTrkOp(truckOpId) {
    const details = {
        urlPath: `/truckOp/getSingle/${truckOpId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getSingleTrkOp");
    return res;
}

export async function getSingleTrk(trkId) {
    const details = {
        urlPath: `/truckOp/truck/${trkId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getSingleTrk");
    return res;
}

export async function getAllTrkOpWPgSch({ limit, pageNumber, searchKeyWord }) {
    const details = {
        urlPath: "/truckOp",
        queryParams: {
            limit,
            offset: (pageNumber * limit) - limit,
            ...(searchKeyWord && { searchKeyWord })
        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/truckOp",
        queryParams: {
            limit: 100000000000000,
            offset: 0,
            ...(searchKeyWord && { searchKeyWord })
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllTrkOpWPgSch");

    return {
        totalLength: res2?.length,
        data: res ? res : []
    }
}

export async function getAllTrksByTpId(trkOpId) {
    if (!trkOpId)
        return []

    const details = {
        urlPath: `/truckOp/getAllTrucks`,
        queryParams: { trkOpId }
    }

    const res = await getData(details);
    console.log(res, "---------------getAllTrksByTpId");
    return res || [];
}

export async function addtruck(data) {
    const details = {
        urlPath: "/truckOp/truck",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------addtruck");
    return res;
}

export async function putTruck(trkId, data) {
    const details = {
        urlPath: "/truckOp/truck/" + trkId,
        body: {
            ...data
        }
    }
    const res = await putData(details);
    console.log(res + "---------------putTruck");
    return res;
}

export async function createTrkOp(data) {
    const details = {
        urlPath: "/truckOp/create",
        body: {
            ...data
        }
    }
    const res = await postData(details);
    console.log(res, "---------------createTrkOp");
    return res;
}

export async function putTrkOp(trkOpId, data) {
    const details = {
        urlPath: "/truckOp/edit/" + trkOpId,
        body: {
            ...data
        }
    }
    const res = await putData(details);
    console.log(res + "---------------putTrkOp");
    return res;
}

export async function putTrkStatus(trkId, status) {
    const details = {
        urlPath: status === 1 ? "/truckOp/enableTrk" : "/truckOp/disableTrk",
        queryParams: { trkId: trkId }
    }
    const res = await putData(details);
    console.log(res + "---------------putTrkStatus");
    return res;
}