export type CategoryTree = {
	id: number;
	parent_id: number;
	name: string;
	icon: string | null;
	weight: number;
};

export type CategoryForm = {
	id?: number;
	parent_id: number;
	name: string;
	icon: string | null;
	weight: number;
};
