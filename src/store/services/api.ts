import axios, {AxiosInstance} from 'axios';
import Cookies from 'js-cookie';
import Qs from 'qs';

export type Methods =
  | 'get'
  | 'put'
  | 'post'
  | 'head'
  | 'delete'
  | 'patch'
  | 'options';

interface FetchOptions {
  method?: Methods;
  data?: any;
  params?: Record<string, any>;
}

interface CookiesOptions {
  name: string;
  value?: string;
  expires?: number;
}

export const getCookie = (name: string) => Cookies.get(name);

export const setCookie = ({name, value = '', expires}: CookiesOptions) =>
  Cookies.set(name, value, {expires});

export const deleteCookie = ({name}: CookiesOptions) => Cookies.remove(name);

const API_URL = process.env.REACT_APP_API_URL;

const applicationFetch: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 360 * 1000,
  paramsSerializer: (params: any) =>
    Qs.stringify(params, {arrayFormat: 'repeat'}),
  headers: {
    'x-csrftoken': getCookie('csrftoken'),
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const defaultOptions: FetchOptions = {method: 'get'};

const api = (url: string, {method, data, params} = defaultOptions) =>
  applicationFetch({
    method: method,
    data: data,
    url: url,
    params: params,
  }).catch((err: Error) => {
    throw err;
  });

export default api;
