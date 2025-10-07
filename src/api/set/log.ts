import { LogSearch } from '@/types/set/log';
import axios from '@/utils/axios';
//统一管理接口
enum api {
	page = '/system/logs',
}

export const reqLogPageList = (data: LogSearch) => axios.get(api.page, { params: data });
