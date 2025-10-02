import { Role } from './role.ts';

// 管理员
export type Admin = {
    id: number;
    name: string;
    password: string;
    phone: number;
    role_id: number;
    role_info?: Role;
    created_at: string;
};

// 管理员搜索
export type AdminSearch = {
    current_page: number;
    page_size: number;
    keyword: string;
};

// 管理员分页列表
export type AdminPageList = {
    current_page: number;
    page_size: number;
    total: number;
    list: Admin[];
};

// 管理员更新
export type AdminForm = {
    id?: number;
    name: string;
    password: string;
    phone: number | null;
    role_id: number;
};

export type AdminDeleteForm = {
    ids: number[];
};
