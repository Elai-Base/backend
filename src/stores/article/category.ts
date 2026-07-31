import { defineStore } from 'pinia';
import { ElNotification, ElMessageBox } from 'element-plus';
import {
	reqArticleCategoryTree,
	reqArticleCategoryInfo,
	reqArticleCategoryCreate,
	reqArticleCategoryUpdate,
	reqArticleCategoryDelete,
} from '@/api/article/category';
import router from '@/router';
import { ref } from 'vue';

import type { CategoryTree } from '@/types/article/category';

let useArticleCategoryStore = defineStore('article-category', () => {
	const loading = ref<boolean>(false);
	const showDialog = ref<boolean>(false);

	const tree = ref<CategoryTree[]>([]);

	const info = ref<CategoryTree>();

	async function treeFunc() {
		loading.value = true;
		const response: any = await reqArticleCategoryTree();
		loading.value = false;
		if (response.code == 0) {
			tree.value = response.data;
		}
	}
	async function infoFunc(id: number) {
		const response: any = await reqArticleCategoryInfo(id);
		if (response.code == 0) {
			info.value = <CategoryTree>response.data;
		}
	}
	async function createFunc(data: any) {
		loading.value = true;
		const response: any = await reqArticleCategoryCreate(data);
		loading.value = false;
		if (response.code == 0) {
			ElNotification.success('操作成功');
			showDialog.value = false;
			treeFunc();
		}
	}
	async function updateFunc(data: any) {
		loading.value = true;
		const response: any = await reqArticleCategoryUpdate(data);
		loading.value = false;
		if (response.code == 0) {
			ElNotification.success('操作成功');
			showDialog.value = false;
			treeFunc();
		}
	}
	async function deleteFunc(id: any) {
		const confirm = await ElMessageBox.confirm('确认删除？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error',
		}).catch(() => {
			console.log('取消操作！');
		});
		if (confirm == 'confirm') {
			loading.value = true;
			const response: any = await reqArticleCategoryDelete({ ids: [id] });
			loading.value = false;
			if (response.code == 0) {
				treeFunc();
			}
		}
	}

	return {
		loading,
		showDialog,

		tree,
		treeFunc,

		info,
		infoFunc,

		createFunc,
		updateFunc,
		deleteFunc,
	};
});

export default useArticleCategoryStore;
