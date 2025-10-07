import { AdminDeleteForm, AdminForm, AdminSearch } from '@/types/set/admin';
import axios from '@/utils/axios';
//统一管理接口
enum api {
	page = '/admins',
	all = '/admins/all',
	login_info = '/admin/info',
	uri = '/admin',
}
//暴露请求函数
export const reqAdminLoginInfo = () => axios.get(api.login_info);

export const reqAdminPageList = (data: AdminSearch) => axios.get(api.page, { params: data });
export const reqAdminAllList = () => axios.get(api.all);
export const reqAdminInfo = (id: number) => axios.get(api.uri + '/' + id);

export const reqAdminCreate = (data: AdminForm) => axios.post(api.uri, data);
export const reqAdminUpdate = (data: AdminForm) => axios.put(api.uri, data);
export const reqAdminDelete = (data: AdminDeleteForm) => axios.delete(api.uri, { data: data });
