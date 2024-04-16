import request from '@/utils/request';
//统一管理接口
enum API {
    tree_list = '/set/menu/tree_list',
    all_list = '/set/menu/all_list',
    info = '/set/menu/info',
    update = '/set/menu/update',
    delete = '/set/menu/delete',
}
//暴露请求函数
export const reqMenuTreeList = () => request.get(API.tree_list);
export const reqMenuAllList = () => request.get(API.all_list);
export const reqMenuInfo = (data: any) => request.get(API.info, { params: data });
export const reqMenuUpdate = (data: any) => request.post(API.update, data);
export const reqMenuDelete = (data: any) => request.post(API.delete, data);
