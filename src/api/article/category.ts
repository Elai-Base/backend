import axios from '@/utils/axios';
//统一管理接口
enum api {
	tree = '/article/categorys/tree',
	uri = '/article/categorys',
}
//暴露请求函数
export const reqArticleCategoryTree = () => axios.get(api.tree);
export const reqArticleCategoryInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqArticleCategoryCreate = (data: any) => axios.post(api.uri, data);
export const reqArticleCategoryUpdate = (data: any) => axios.put(api.uri + '/' + data.id, data);
export const reqArticleCategoryDelete = (data: any) => axios.delete(api.uri, { data: data });
