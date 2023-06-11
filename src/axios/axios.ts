import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_PROXY_BACKEND_URL || 'http://localhost:80',
});

export default instance;