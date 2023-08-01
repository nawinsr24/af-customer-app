import { getData } from "./rest-api-helper";

export async function getAllBannersService() {
    try {
        const details = {
            urlPath: "/admin/banners",
        };

        const res = await getData(details);
        return res.data;
    } catch (error) {
        return error;
    }

}
