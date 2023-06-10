import { getData, postData, putData } from "./rest-api-helper"

export async function getAllCust() {
    const details = {
        urlPath: "/customer"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllCust");
    return res;
}

export async function putCustStatus(custId, status) {
    const details = {
        urlPath: "/customer",
        queryParams: { custId: custId, status }
    }

    const res = await putData(details);
    console.log(res + "---------------putCustStatus");
    return res;
}

export async function postCust(data) {
    const details = {
        urlPath: "/customer/create",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------postCust");
    return res;
}

export async function getSingleCust(custId) {
    const details = {
        urlPath: `/customer/getSingle/${custId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getSingleCust");
    return res;
}

export async function putCust(custId, data) {
    const details = {
        urlPath: `/customer/edit/${custId}`,
        body: {
            fName: data.fName,
            lName: data.lName,
            mobile2: data.mobile2,
            email: data.email,
            comName: data.comName,
            comAddress: data.comAddress,
            comContact_no: data.comContact_no,
            comDescription: data.comDescription
        }

    }

    const res = await putData(details);
    console.log(res + "---------------putCust");
    return res;
}

export async function getAllCustWPgSch({ limit, pageNumber, searchKeyWord }) {
    const details = {
        urlPath: "/customer",
        queryParams: {
            limit,
            offset: (pageNumber * limit) - limit,
            ...(searchKeyWord && { searchKeyWord })
        }
    }
    let res = await getData(details);

    const details2 = {
        urlPath: "/customer",
        queryParams: {
            limit: 100000000000000,
            offset: 0,
            ...(searchKeyWord && { searchKeyWord })
        }
    }
    let res2 = await getData(details2);

    console.log(res, "---------------getAllCustWPgSch");

    return {
        totalLength: res2?.length ,
        data: res ? res : []
    }
}

export async function getAllMatTypes() {
    const details = {
        urlPath: "/customer/matTypes"
    }
    let res = await getData(details);

    console.log(res, "---------------getAllMatTypes");

    return res ? res : []
}

export async function getAllTrkTypes() {
    const details = {
        urlPath: "/customer/trkTypes"
    }
    let res = await getData(details);

    console.log(res, "---------------getAllTrkTypes");

    return res ? res : []
}