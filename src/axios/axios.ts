import axios from "axios";
import { useAuthorizationStore } from "@/store/AuthorizationStore";

const instance = axios.create({
    // baseURL: process.env.VUE_APP_BACKEND_URL || 'http://localhost:8081',
    baseURL: 'http://localhost:8081',
});

instance.interceptors.request.use((config) => {
    const authorization = useAuthorizationStore()
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Basic ${authorization.getCookie('token')}`
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;