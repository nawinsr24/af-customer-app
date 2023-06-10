import { getData } from "./rest-api-helper"
import axios from "axios";

export async function fileUploadService(file) {
    const res = await getData({ urlPath: "/s3/new" });

    const res01 = await s3FileUpload({ urlPath: res.url, file })

    console.log("res01---------------------", res01)
    console.log(res, "---------------fileUploadService");

    // if (res01.status === 200 || res01.status === 201)
    return res.key;
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
    console.log({ urlPath, file, 'Content-Type': file.type })
    // var body = new FormData();
    // body.append('file', file);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', file.type);

    let res = await fetch(urlPath, { method: 'PUT', headers: myHeaders, body: file });

    if (res.status === 200 || res.status === 201)
        return res;
    else
        // eslint-disable-next-line no-throw-literal
        throw "apiError"
};

export async function getFileUrl({ fileKey }) {
    const details = {
        urlPath: "/s3/get",
        queryParams: { key: fileKey }
    }

    const res = await getData(details);
    console.log(res + "---------------getFileUrl");
    return res.url;
}