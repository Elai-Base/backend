export type Menu = {
	id: number;
	parent_id: number;
	name: string;
	uri: string;
	icon: string;
	weight: number;
	children: Menu[];
	permission: Permission[];
};

export type Permission = {
	id: number;
	menu: string;
	menu_path: number[];
	menu_id: number;
	uri: string;
};

export type PermissionForm = {
	id?: number;
	menu: string;
	menu_path: number[];
	menu_id: number;
	uri: string;
};
