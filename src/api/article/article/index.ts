import request from '@/utils/request';
//统一管理接口
enum API {
    page_list = '/article/article/page_list',
    info = '/article/article/info',
    update = '/article/article/update',
    delete = '/article/article/delete',
}
//暴露请求函数
export const reqArticlePageList = (data: any) => request.get(API.page_list, { params: data });
export const reqArticleInfo = (data: any) => request.get(API.info, { params: data });
export const reqArticleUpdate = (data: any) => request.post(API.update, data);
export const reqArticleDelete = (data: any) => request.post(API.delete, data);
