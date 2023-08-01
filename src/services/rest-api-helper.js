import axios from "axios";
import { notify } from "../components/notify";


// axios.defaults.baseURL = "https://dev.api.amirthafashion.com";
axios.defaults.baseURL = "http://127.0.0.1:9005";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export async function postData({ urlPath, body }) {
    try {
        const response = await axios.post(urlPath, JSON.stringify(body));

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        if (error?.message?.includes('status code 401')) {
            notify('error', error.response?.data?.message);
        }

        throw error.response.data;
    }
};

export async function getData({ urlPath, queryParams }) {
    try {
        const response = await axios.get(urlPath, { params: queryParams });
        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export async function putData({ urlPath, body, queryParams }) {
    try {
        const response = await axios.put(urlPath, body ? JSON.stringify(body) : {}, { params: queryParams });

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export async function deleteData({ urlPath, body, queryParams }) {
    try {
        const response = await axios.delete(urlPath, body ? JSON.stringify(body) : {}, { params: queryParams });

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        throw error.response.data;
    }
};



