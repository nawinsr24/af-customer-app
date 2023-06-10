import { deleteData, getData, postData, putData } from './rest-api-helper';

export async function getAllPricFactors() {
    const details = {
        urlPath: '/pricing/custFactor',
    };

    const res = await getData(details);
    console.log(res, '  ---------------getAllPricFactors');
    return res;
}

export async function putPricFactor(pricFacId, data) {
    const details = {
        urlPath: `/pricing/custFactorEdit/${pricFacId}`,
        body: {
            ...data,
        },
    };
    const res = await putData(details);
    console.log(res + '---------------putPricFactor');
    return res;
}

export async function deletePricFactor(pricFacId) {
    const details = {
        urlPath: `/pricing/custFactor/${pricFacId}`,
    };
    const res = await deleteData(details);
    console.log(res + '---------------deletePricFactor');
    return res;
}

export async function postPriceFactor(data) {
    const details = {
        urlPath: '/pricing/custFactor',
        body: {
            factor: data.factor,
            percent: data.percent,
        },
    };

    const res = await postData(details);
    console.log(res, '---------------postPriceFactor');
    return res;
}
