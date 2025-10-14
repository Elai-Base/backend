import { defineStore } from 'pinia';
import { ElNotification, ElMessageBox } from 'element-plus';
import {
	reqAdminLoginInfo,
	reqAdminPageList,
	reqAdminInfo,
	reqAdminCreate,
	reqAdminUpdate,
	reqAdminDelete,
	reqAdminAllList,
} from '@/api/set/admin';

import router from '@/router';
import { ref } from 'vue';
import { Admin, AdminForm, AdminPageList, AdminSearch } from '@/types/set/admin';
let useSetAdminStore = defineStore('set-admin', () => {
	const loading = ref<boolean>(false);

	const loginInfo = ref<Admin>({
		id: 0,
		name: '',
		password: '',
		phone: 0,
		role_id: 0,
		role_info: {
			id: 0,
			name: '',
			permission: [],
			created_at: '',
		},
		created_at: '',
	});

	const info = ref<Admin>({
		id: 0,
		name: '',
		password: '',
		phone: 0,
		role_id: 0,
		role_info: {
			id: 0,
			name: '',
			permission: [],
			created_at: '',
		},
		created_at: '',
	});

	const search = ref<AdminSearch>({
		current_page: 1,
		page_size: 10,
		keyword: '',
	});

	const pageData = ref<AdminPageList>({
		current_page: 1,
		page_size: 10,
		total: 0,
		list: [],
	});

	const all = ref<Admin[]>([]);

	async function loginInfoFunc() {
		const response: any = await reqAdminLoginInfo();
		if (response.code == 0) {
			loginInfo.value = <Admin>response.data;
		}
	}

	async function pageFunc() {
		loading.value = true;
		const response: any = await reqAdminPageList(search.value);
		loading.value = false;
		if (response.code == 0) {
			pageData.value = <AdminPageList>response.data;
		}
	}

	async function allFunc() {
		loading.value = true;
		const response: any = await reqAdminAllList();
		loading.value = false;
		if (response.code == 0) {
			all.value = <Admin[]>response.data;
		}
	}
	async function infoFunc(id: number) {
		const response: any = await reqAdminInfo(id);
		if (response.code == 0) {
			info.value = <Admin>response.data;
		}
	}

	async function createFunc(data: AdminForm) {
		const response: any = await reqAdminCreate(data);
		if (response.code == 0) {
			ElNotification.success('创建成功');
			router.go(-1);
		}
	}

	async function updateFunc(data: AdminForm) {
		const response: any = await reqAdminUpdate(data);
		if (response.code == 0) {
			ElNotification.success('更新成功');
			router.go(-1);
		}
	}
	async function deleteFunc(id: number) {
		const confirm = await ElMessageBox.confirm('确认删除？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error',
		}).catch(() => {
			console.log('取消操作！');
		});
		if (confirm == 'confirm') {
			const response: any = await reqAdminDelete({ ids: [id] });
			if (response.code == 0) {
				// 删除成功后刷新列表
				ElNotification.success('删除成功');
				pageFunc();
			}
		}
	}

	return {
		loading,

		loginInfo,
		loginInfoFunc,

		search,

		pageData,
		pageFunc,

		all,
		allFunc,

		info,
		infoFunc,

		createFunc,
		updateFunc,
		deleteFunc,
	};
});

export default useSetAdminStore;
