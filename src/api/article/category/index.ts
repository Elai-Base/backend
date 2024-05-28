import request from '@/utils/request';
//统一管理接口
enum API {
    tree_list = '/article/category/tree_list',
    info = '/article/category/info',
    update = '/article/category/update',
    delete = '/article/category/delete',
}
//暴露请求函数
export const reqArticleCategoryTreeList = () => request.get(API.tree_list);
export const reqArticleCategoryInfo = (data: any) => request.get(API.info, { params: data });
export const reqArticleCategoryUpdate = (data: any) => request.post(API.update, data);
export const reqArticleCategoryDelete = (data: any) => request.post(API.delete, data);
