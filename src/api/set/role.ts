import type { RoleDeleteForm, RoleForm, RoleSearch, RoleAbleForm } from '@/types/set/role';
import axios from '@/utils/axios';
//统一管理接口
enum api {
	all = '/system/roles/all',
	uri = '/system/roles',
	able = 'system/roles/able',
}
//暴露请求函数
export const reqRolePageList = (data: RoleSearch) => axios.get(api.uri, { params: data });
export const reqRoleAllList = () => axios.get(api.all);
export const reqRoleInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqRoleCreate = (data: RoleForm) => axios.post(api.uri, data);
export const reqRoleUpdate = (data: RoleForm) => axios.put(api.uri + '/' + data.id, data);
export const reqRoleAble = (data: RoleAbleForm) => axios.put(api.able, data);
export const reqRoleDelete = (data: RoleDeleteForm) => axios.delete(api.uri, { data: data });
