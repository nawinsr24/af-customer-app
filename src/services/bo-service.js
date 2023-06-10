import { getData, postData, putData, deleteData } from "./rest-api-helper"

export async function getAllBo() {
    const details = {
        urlPath: "/backoffice"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllBo");
    return res;
}

export async function putBoStatus(boId, status) {
    const details = {
        urlPath: "/backoffice",
        queryParams: { backofficeId: boId, status }
    }

    const res = await putData(details);
    console.log(res + "---------------putBoStatus");
    return res;
}

export async function addBo(data) {
    const details = {
        urlPath: "/backoffice",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res, "---------------addBo");
    return res;
}

export async function getBoById(boId) {
    const details = {
        urlPath: `/backoffice/getSingle/${boId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getBoById");
    return res;
}

export async function putBo(boId, data) {
    const details = {
        urlPath: `/backoffice/edit/${boId}`,
        body: {
            ...data
        }
    }
    const res = await putData(details);
    console.log(res + "---------------putBoStatus");
    return res;
}

export async function postBoUser(data) {
    const details = {
        urlPath: "/backoffice/staff",
        body: {
            ...data
        }
    }

    const res = await postData(details);
    console.log(res + "---------------postBoUser");
    return res;
}

export async function putStaffStatus(staffId, status) {
    const details = {
        urlPath: "/backoffice/staff",
        queryParams: { staffId: staffId, status }
    }

    const res = await putData(details);
    console.log(res + "---------------putStaffStatus");
    return res;
}

export async function getStaffById(staffId) {
    const details = {
        urlPath: `/backoffice/staff/getSingle/${staffId}`
    }

    const res = await getData(details);
    console.log(res, "---------------getStaffById");
    return res;
}


export async function putBoStaff(staffId, data) {
    const details = {
        urlPath: `/backoffice/staff/edit/${staffId}`,
        body: {
            ...data
        }
    }
    const res = await putData(details);
    console.log(res + "---------------putBoStaff");
    return res;
}

export async function getAllBoStaffs() {
    const details = {
        urlPath: "/backoffice/staff"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllBoStaffs");
    return res;
}

export async function putBoStaffStatus(staffId, status) {
    const details = {
        urlPath: "/backoffice/staff",
        queryParams: { staffId, status }
    }

    const res = await putData(details);
    console.log(res + "---------------putBoStaffStatus");
    return res;
}

export async function getBoAbout() {
    const details = {
        urlPath: "/backoffice/about"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllBoAbout");
    return res;
}

export async function putBoAbout(data) {
    const details = {
        urlPath: "/backoffice/about",
        body: {
            ...data
        }
    }
    const res = await putData(details);
    console.log(res + " ---------------putBoAbout");
    return res;
}

export async function getDashboardService() {
    const details = {
        urlPath: "/backoffice/dashboard"
    }

    const res = await getData(details);
    console.log(res, "---------------getDashboard");
    return res;
}

export async function getAllReportConfigs() {
    const details = {
        urlPath: "/backoffice/reportConfig"
    }

    const res = await getData(details);
    console.log(res, "---------------getAllReportConfigs");
    return res || [];
}


export async function addReportConfig({ configName, config }) {
    const details = {
        urlPath: "/backoffice/reportConfig",
        body: {
            configName,
            config: JSON.stringify(config)
        }
    }

    const res = await postData(details);
    console.log(res, "---------------addReportConfig");
    return res;
}

export async function putReportConfig({  configName, config, id }) {
    const details = {
        urlPath: "/backoffice/reportConfig/" + id,
        body: {
            configName,
            config: JSON.stringify(config)
        }
    }

    const res = await putData(details);
    console.log(res, "---------------putReportConfig");
    return res;
}

export async function deleteReportConfig(id) {
    const details = {
        urlPath: "/backoffice/reportConfig/" + id
    }

    const res = await deleteData(details);
    console.log(res, "---------------deleteReportConfig");
    return res;
}