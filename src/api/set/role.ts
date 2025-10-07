import { RoleDeleteForm, RoleForm, RoleSearch } from '@/types/set/role';
import axios from '@/utils/axios';
//统一管理接口
enum api {
	page = '/system/roles',
	all = '/system/roles/all',

	uri = '/system/role',
}
//暴露请求函数
export const reqRolePageList = (data: RoleSearch) => axios.get(api.page, { params: data });
export const reqRoleAllList = () => axios.get(api.all);
export const reqRoleInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqRoleCreate = (data: RoleForm) => axios.post(api.uri, data);
export const reqRoleUpdate = (data: RoleForm) => axios.put(api.uri, data);
export const reqRoleDelete = (data: RoleDeleteForm) => axios.delete(api.uri, { data: data });
