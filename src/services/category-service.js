import { getData } from "./rest-api-helper"

export async function getAllSubCatService() {
    const details = {
        urlPath: "/admin/subcategory",
    }

    const res = await getData(details);
    console.log(res, "---------------getAllSubCatService");
    return res.data;
}
