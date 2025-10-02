import axios from '@/utils/axios';

//统一管理接口
enum api {
    env = '/login/env',
    account_login = '/login/account',
    refresh = '/login/refresh',
    login_out = '/login/login_out',
}

import { LoginForm } from '@/types/login';
export const reqEnv = () => axios.get(api.env);
export const reqAccountLogin = (data: LoginForm) => axios.post(api.account_login, data);
export const reqLoginOut = () => axios.post(api.login_out);
export const reqLoginRefresh = () => axios.post(api.refresh);
