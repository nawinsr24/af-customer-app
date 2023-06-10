import axios from "axios";



// axios.defaults.baseURL = "http://ylapi.bigblue.in";
//axios.defaults.baseURL = "http://localhost:5000";

 axios.defaults.baseURL = "https://testapi.dlxlogistics.in";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export async function postData({ urlPath, body }) {
    try {
        const response = await axios.post(urlPath, JSON.stringify(body));

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.status
    }
};

export async function getData({ urlPath, queryParams }) {
    try {
        const response = await axios.get(urlPath, { params: queryParams });
        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        console.log(error);   
        throw error.response.status
    }
};

export async function putData({ urlPath, body, queryParams }) {
    try {
        const response = await axios.put(urlPath, body ? JSON.stringify(body) : {}, { params: queryParams });

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.status
    }
};

export async function deleteData({ urlPath, body, queryParams }) {
    try {
        const response = await axios.delete(urlPath, body ? JSON.stringify(body) : {}, { params: queryParams });

        if (response.status === 200 || response.status === 201)
            return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.status
    }
};



