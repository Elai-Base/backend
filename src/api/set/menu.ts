import { MenuDeleteForm, MenuForm } from '@/types/set/menu';
import axios from '@/utils/axios';
//统一管理接口
enum api {
    tree = '/system/menus/tree',
    all = '/system/menus/all',

    uri = '/system/menu',
}
//暴露请求函数
export const reqMenuTreeList = () => axios.get(api.tree);
export const reqMenuAllList = () => axios.get(api.all);

export const reqMenuInfo = (id: number) => axios.get(api.uri + '/' + id);
export const reqMenuCreate = (data: MenuForm) => axios.post(api.uri, data);
export const reqMenuUpdate = (data: MenuForm) => axios.put(api.uri, data);
export const reqMenuDelete = (data: MenuDeleteForm) => axios.delete(api.uri, { data: data });
