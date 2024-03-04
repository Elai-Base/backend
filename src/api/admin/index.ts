import request from '@/utils/request';
import { LoginForm } from './type';
//统一管理接口
enum API {
    ENV_CONFIG = '/login/env_config',
    ACCOUNT_LOGIN = '/login/account_login',
    INFO = '/set/admin/info',
    LOGIN_OUT = '/set/admin/login_out',
}
//暴露请求函数

//获取环境信息
export const reqEnvConfig = () => request.get(API.ENV_CONFIG);
//登录方法
export const reqAccountLogin = (data: LoginForm) => request.post(API.ACCOUNT_LOGIN, data);

//退出登录
export const reqLoginOut = () => request.post(API.LOGIN_OUT);

//获取用户信息
export const reqAdminInfo = () => request.get(API.INFO);