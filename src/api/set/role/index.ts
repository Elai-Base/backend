import request from '@/utils/request';
//统一管理接口
enum API {
    page_list = '/system/role/page_list',
    all_list = '/system/role/all_list',
    info = '/system/role/info',
    update = '/system/role/update',
    delete = '/system/role/delete',
}
//暴露请求函数
export const reqRolePageList = (data: any) => request.get(API.page_list, { params: data });
export const reqRoleAllList = () => request.get(API.all_list);
export const reqRoleInfo = (data: any) => request.get(API.info, { params: data });
export const reqRoleUpdate = (data: any) => request.post(API.update, data);
export const reqRoleDelete = (data: any) => request.post(API.delete, data);
