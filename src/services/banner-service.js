import { getData } from "./rest-api-helper"

export async function getAllBannersService() {
    const details = {
        urlPath: "/admin/banners",
    }

    const res = await getData(details);
    console.log(res, "---------------getAllBanners");
    return res.data;
}
