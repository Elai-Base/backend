import { defineStore } from 'pinia';
import { ElMessageBox } from 'element-plus';
import {
	reqArticlePageList,
	reqArticleInfo,
	reqArticleUpdate,
	reqArticleDelete,
} from '@/api/article/article';
import { ref } from 'vue';
import router from '@/router';

let useArticleStore = defineStore('article_article', () => {
	const loading = ref<boolean>(false);
	const search = ref({
		current_page: 1,
		page_size: 10,
		keyword: '',
	});
	const pageData = ref({
		current_page: 1,
		page_size: 10,
		total: 0,
		list: [],
	});

	const info = ref({
		uuid: '',
		title: '',
		cover: '',
		detail_info: {
			content: '',
		},
	});

	async function pageFunc() {
		loading.value = true;
		const response: any = await reqArticlePageList(search.value);
		loading.value = false;
		if (response.code == 0) {
			pageData.value.list = response.data.list;
			pageData.value.total = response.data.total;
		}
	}

	async function infoFunc(uuid: string) {
		loading.value = true;
		const response: any = await reqArticleInfo(uuid);
		loading.value = false;
		if (response.code == 0) {
			info.value = response.data;
		}
	}
	async function updateFunc(data: any) {
		loading.value = true;
		const response: any = await reqArticleUpdate(data);
		loading.value = false;
		if (response.code == 0) {
			router.go(-1);
		}
	}
	async function deleteFunc(uuid: any) {
		const confirm = await ElMessageBox.confirm('确认删除？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error',
		}).catch(() => {
			console.log('取消操作！');
		});
		if (confirm == 'confirm') {
			loading.value = true;
			const response: any = await reqArticleDelete({ uuid: uuid });
			loading.value = false;
			if (response.code == 0) {
				pageFunc();
			}
		}
	}

	return {
		loading,
		search,
		info,
		pageData,

		pageFunc,
		infoFunc,
		updateFunc,
		deleteFunc,
	};
});

export default useArticleStore;
