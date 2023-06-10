import { deleteData, getData, postData } from "./rest-api-helper";

export async function getCombGrpList({ custId, type }) {
    const details = {
        urlPath: "/combGrp",
        queryParams: { custId, type }
    }

    const res = await getData(details);
    console.log(res + "---------------getCombGrpList");
    return res;
}

export async function createGrp(data) {
    const details = {
        urlPath: "/combGrp",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------createGrp");
    return res;
}

export async function getCombGrItemList({ grpId }) {
    const details = {
        urlPath: "/combGrp/getDDCombGrpsIdsList/" + grpId,
    }

    const res = await getData(details);
    console.log(res + "---------------getCombGrItemList");
    return res || [];
}

export async function rmvCombGrpItem({ id, type }) {
    const details = {
        urlPath: type === "req" ? "/combGrp/rmvCombGrpReq/" + id : "/combGrp/rmvCombGrpShipmt/" + id,
    }

    const res = await deleteData(details);
    console.log(res + "---------------rmvCombGrpItem");
    return res || [];
}


export async function getNotCombGrItemList({ custId, type }) {
    const details = {
        urlPath: "/combGrp/getDDNotCombIdsList",
        queryParams: { custId, type }
    }

    const res = await getData(details);
    console.log(res + "---------------getNotCombGrItemList");
    return res || [];
}

export async function addGrpItems(data) {
    const details = {
        urlPath: "/combGrp/id",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------addGrpItems");
    return res;
}