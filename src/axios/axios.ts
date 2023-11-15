import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL || 'http://localhost:8081',
});

export default instance;