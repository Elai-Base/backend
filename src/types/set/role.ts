// 角色信息
export type Role = {
    id: number;
    name: string;
    permission: number[];
    created_at: string;
};

// 搜索
export type RoleSearch = {
    current_page: number;
    page_size: number;
    keyword: string;
};

// 管理员分页列表
export type RolePageList = {
    current_page: number;
    page_size: number;
    total: number;
    list: Role[];
};

// 管理员表单
export type RoleForm = {
    id?: number;
    name: string;
    permission: number[];
};

export type RoleDeleteForm = {
    ids: number[];
};
