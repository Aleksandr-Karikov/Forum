import axios, {
    AxiosError, AxiosResponse, AxiosRequestConfig,
} from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'shared/const/auth';
import { INTERNAL_SERVER_ERROR } from 'shared/const/errors';

const request = async <T>(config: AxiosRequestConfig) => new Promise<T>((resolve, reject) => {
    axios.defaults.baseURL = `${process.env.API_HOST}/api`;
    axios.defaults.paramsSerializer = (params) => qs.stringify(params);
    axios.defaults.headers = {
        Authorization: Cookies.get(TOKEN_KEY) ? `Bearer ${Cookies.get(TOKEN_KEY)}` : '',
    };

    axios.request<T>(config)
        .then((result: AxiosResponse) => {
            resolve(result.data);
        })
        .catch((error: AxiosError) => {
            if (error.response.status === 500) {
                reject(INTERNAL_SERVER_ERROR);
            }
            if (error.response.status === 401) {
                Cookies.remove(TOKEN_KEY);
                window.location.reload();
            }
            reject(error.response.data.message || error.response.data.errors);
        });
});

export const api = {
    post: <T>(args: AxiosRequestConfig) => request<T>({ method: 'post', ...args }),
    get: <T>(args: AxiosRequestConfig) => request<T>({ method: 'get', ...args }),
    patch: <T>(args: AxiosRequestConfig) => request<T>({ method: 'patch', ...args }),
    put: <T>(args: AxiosRequestConfig) => request<T>({ method: 'put', ...args }),
};
