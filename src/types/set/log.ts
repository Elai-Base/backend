export type LogSearch = {
	current_page: number;
	page_size: number;
	admin_id?: number | null;
	keyword?: string;
};

export type Log = {
	id: number;
	admin_id: number;
	name: string;
	uri: string;
	ip: string;
	agent: string;
	data: string;
	created_at: string;
};

export type LogPageData = {
	current_page: number;
	page_size: number;
	total: number;
	list: Log[];
};
