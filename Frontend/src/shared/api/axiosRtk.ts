import { createApi } from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'shared/const/auth';

export const axiosBaseQuery = (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
        > => async ({
    url, method, data, params,
}) => {
    axios.defaults.baseURL = `${process.env.API_HOST}/api`;
    axios.defaults.paramsSerializer = (params) => qs.stringify(params);
    axios.defaults.headers = {
        Authorization: Cookies.get(TOKEN_KEY) ? `Bearer ${Cookies.get(TOKEN_KEY)}` : '',
    };

    try {
        const result = await axios({
            method, data, params, url,
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};
