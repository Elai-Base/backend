import request from '@/utils/request';
//统一管理接口
enum API {
    page_list = '/admin/page_list',
    all_list = '/admin/all_list',
    info = '/admin/info',
    update = '/admin/update',
    delete = '/admin/delete',
}
//暴露请求函数
export const reqAdminPageList = (data: any) => request.get(API.page_list, { params: data });
export const reqAdminAllList = () => request.get(API.all_list);
export const reqAdminInfo = (data: any) => request.get(API.info, { params: data });
export const reqAdminUpdate = (data: any) => request.post(API.update, data);
export const reqAdminDelete = (data: any) => request.post(API.delete, data);
