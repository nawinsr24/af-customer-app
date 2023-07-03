import { getData } from "./rest-api-helper"
import axios from "axios";

export async function fileUploadService(file) {
    try {
        const res = await getData({ urlPath: "/s3/new" });
        const res01 = await s3FileUpload({ urlPath: res.url, file })
        return res.key;
    } catch (error) {
        return;
    }

}



// async function s3FileUpload({ urlPath, file }) {
//     return new Promise((resolve, reject) => {
//         console.log({ urlPath, file, 'Content-Type': file.type })
//         const uninterceptedAxiosInstance = axios.create();

//         uninterceptedAxiosInstance.request({
//             method: 'PUT',
//             headers: { 'Content-Type': file.type },
//             url: urlPath,
//             body: file
//         }).then((response) => {
//             if (response.status === 200 || response.status === 201)
//                 resolve(response.status);
//             else
//                 reject(response.status);
//         }).catch((error) => {
//             console.log(error)
//             reject(error)
//         })
//     });
// };


async function s3FileUpload({ urlPath, file }) {

    try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', file.type);

        let res = await fetch(urlPath, { method: 'PUT', headers: myHeaders, body: file });

        if (res.status === 200 || res.status === 201)
            return res;
        else
            // eslint-disable-next-line no-throw-literal
            throw "apiError"
    } catch (error) {
        return
    }

};

export async function getFileUrl({ fileKey }) {
    try {
        const details = {
            urlPath: "/s3/get",
            queryParams: { key: fileKey }
        }

        const res = await getData(details);
        return res.url;
    } catch (error) {
        return;
    }

}