import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';

export const TOKEN_KEY = 'project_ab.token';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers = config.headers || {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
});

export class ApiError extends Error {
    status: number;
    data: any;
    constructor(message: string, status: number, data: any) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

const unwrap = async <T>(p: Promise<{ data: T }>): Promise<T> => {
    try {
        const res = await p;
        return res.data;
    } catch (err) {
        const e = err as AxiosError<any>;
        const status = e.response?.status ?? 0;
        const message =
            e.response?.data?.message ||
            e.message ||
            'Network error';
        throw new ApiError(message, status, e.response?.data);
    }
};

export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
    unwrap<T>(api.get(url, config));
export const apiPost = <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    unwrap<T>(api.post(url, body, config));
export const apiPatch = <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    unwrap<T>(api.patch(url, body, config));
export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
    unwrap<T>(api.delete(url, config));
