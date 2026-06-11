import axios from '@/utils/axios';

//统一管理接口
enum api {
	get = '/captcha',
	check = '/captcha/check',
}

import type { GetReq, CheckReq } from '@/types/captcha';
export const reqCaptchaGet = (data: GetReq) => axios.get(api.get, { params: data });
export const reqCaptchaCheck = (data: CheckReq) => axios.post(api.check, data);
