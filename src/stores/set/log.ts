import { reqLogPageList } from '@/api/set/log';
import { LogPageData, LogSearch } from '@/types/set/log';
import { defineStore } from 'pinia';
import { ref } from 'vue';

let useSetLogStore = defineStore('set-log', () => {
	const loading = ref(false);

	const search = ref<LogSearch>({
		current_page: 1,
		page_size: 10,
		admin_id: null,
		keyword: '',
	});
	const pageData = ref<LogPageData>({
		current_page: 1,
		page_size: 10,
		total: 0,
		list: [],
	});

	async function pageFunc() {
		loading.value = true;
		const response: any = await reqLogPageList(search.value);
		loading.value = false;
		if (response.code == 0) {
			pageData.value = <LogPageData>response.data;
		}
	}
	return {
		loading,

		search,
		pageData,
		pageFunc,
	};
});

export default useSetLogStore;
