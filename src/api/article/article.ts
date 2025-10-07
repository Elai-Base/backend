import axios from '@/utils/axios';
//统一管理接口
enum api {
	page = '/article/articles',

	uri = '/article/article',
}
//暴露请求函数
export const reqArticlePageList = (data: any) => axios.get(api.page, { params: data });
export const reqArticleInfo = (id: string) => axios.get(api.uri + '/' + id);

export const reqArticleUpdate = (data: any) => axios.post(api.uri, data);
export const reqArticleDelete = (data: any) => axios.post(api.uri, { data: data });
