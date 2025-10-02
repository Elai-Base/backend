// 菜单
export interface Menu {
    id: number;
    parent_id: number;
    name: string;
    uri: string | null;
    icon: string | null;
    weight: number;
    children: Menu[];
}

export type Breadcrumb = {
    name: string;
    path: string;
};

export type MenuForm = {
    id?: number;
    parent_id: number | null;
    name: string;
    uri: string | null;
    icon: string | null;
    weight: number;
};

export type MenuDeleteForm = {
    ids: number[];
};
