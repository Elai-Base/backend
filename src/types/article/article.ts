export type Article = {
	id: number;
	parent_id: number;
	name: string;
	icon: string | null;
	weight: number;
};

export type ArticleForm = {
	id?: number;
	parent_id: number;
	name: string;
	icon: string | null;
	weight: number;
};
