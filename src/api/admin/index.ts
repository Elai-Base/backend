import request from '@/utils/request';
import { LoginForm } from './type';
//统一管理接口
enum API {
    env = '/login/env',
    account_login = '/login/login',
    check_login = '/login/check',
    info = '/login/info',
    login_out = '/login/login_out',
}
//暴露请求函数

//获取环境信息
export const reqEnvConfig = () => request.get(API.env);
//登录方法
export const reqAccountLogin = (data: LoginForm) => request.post(API.account_login, data);

//退出登录
export const reqLoginOut = () => request.post(API.login_out);

export const reqCheckLogin = () => request.post(API.check_login);
//获取用户信息
export const reqAdminInfo = () => request.get(API.info);
