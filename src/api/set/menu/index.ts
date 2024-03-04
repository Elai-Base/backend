import request from '@/utils/request';
//统一管理接口
enum API {
    TREE_LIST = '/set/menu/tree_list',
    ALL_LIST = '/set/menu/all_list',
    INFO = '/set/menu/info',
    UPDATE = '/set/menu/update',
    DELETE = '/set/menu/delete',
}
//暴露请求函数
export const reqMenuTreeList = () => request.get(API.TREE_LIST);
export const reqMenuAllList = () => request.get(API.ALL_LIST);
export const reqMenuInfo = (data: any) => request.get(API.INFO, { params: data });
export const reqMenuUpdate = (data: any) => request.post(API.UPDATE, data);
export const reqMenuDelete = (data: any) => request.post(API.DELETE, data);
