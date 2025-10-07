import axios from '@/utils/axios';
//统一管理接口
enum api {
	tree = '/system/permissions/tree',
	uri = '/system/permission',
}
//暴露请求函数
export const reqPermissionTreeList = () => axios.get(api.tree);

export const reqPermissionInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqPermissionCreate = (data: any) => axios.post(api.uri, data);
export const reqPermissionUpdate = (data: any) => axios.put(api.uri, data);
export const reqPermissionDelete = (data: any) => axios.delete(api.uri, data);
