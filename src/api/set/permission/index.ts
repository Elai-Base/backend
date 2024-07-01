import request from '@/utils/request';
//统一管理接口
enum API {
    tree_list = '/system/permission/tree_list',
    info = '/system/permission/info',
    update = '/system/permission/update',
    delete = '/system/permission/delete',
}
//暴露请求函数
export const reqPermissionTreeList = () => request.get(API.tree_list);
export const reqPermissionInfo = (data: any) => request.get(API.info, { params: data });
export const reqPermissionUpdate = (data: any) => request.post(API.update, data);
export const reqPermissionDelete = (data: any) => request.post(API.delete, data);
