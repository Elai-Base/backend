import axios from '@/utils/axios';
//统一管理接口
enum api {
    tree = '/article/category/tree',
    uri = '/article/category',
}
//暴露请求函数
export const reqArticleCategoryTreeList = () => axios.get(api.tree);
export const reqArticleCategoryInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqArticleCategoryUpdate = (data: any) => axios.post(api.uri, data);
export const reqArticleCategoryDelete = (data: any) => axios.post(api.uri, data);
