// 菜单
export type Menu = {
	id: number;
	parent_id: number;
	name: string;
	uri: string | null;
	icon: string | null;
	icon_size: string | null;
	weight: number;
	children: Menu[];
};

export type Breadcrumb = {
	name: string;
	path: string;
};

export type MenuForm = {
	id?: number;
	parent_id: number;
	name: string;
	uri: string | null;
	icon: string | null;
	icon_size: string | null;
	weight: number;
};

export type MenuDeleteForm = {
	ids: number[];
};
