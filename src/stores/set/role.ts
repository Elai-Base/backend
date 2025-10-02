import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqRolePageList,
    reqRoleAllList,
    reqRoleInfo,
    reqRoleCreate,
    reqRoleUpdate,
    reqRoleDelete,
} from '@/api/set/role';
import router from '@/router';
import { Role, RoleSearch, RolePageList, RoleForm } from '@/types/set/role';
import { ref } from 'vue';
let useSetRoleStore = defineStore('set-role', () => {
    const loading = ref<boolean>(false);

    const search = ref<RoleSearch>({
        current_page: 1,
        page_size: 10,
        keyword: '',
    });

    const pageData = ref<RolePageList>({
        current_page: 1,
        page_size: 10,
        total: 0,
        list: [],
    });

    const all = ref<Role[]>([]);

    const info = ref<Role>({
        id: 0,
        name: '',
        permission: [],
        created_at: '',
    });

    async function pageFunc() {
        loading.value = true;
        const response: any = await reqRolePageList(search.value);
        loading.value = false;
        if (response.code == 0) {
            pageData.value = <RolePageList>response.data;
        }
    }

    async function allFunc() {
        const response: any = await reqRoleAllList();
        if (response.code == 0) {
            all.value = <Role[]>response.data;
        }
    }
    async function infoFunc(id: number) {
        loading.value = true;
        const response: any = await reqRoleInfo(id);
        loading.value = false;
        if (response.code == 0) {
            info.value = <Role>response.data;
        }
    }
    async function createFunc(data: RoleForm) {
        loading.value = true;
        const response: any = await reqRoleCreate(data);
        loading.value = false;
        if (response.code == 0) {
            ElNotification.success('创建成功');
            router.go(-1);
        }
    }
    async function updateFunc(data: RoleForm) {
        loading.value = true;
        const response: any = await reqRoleUpdate(data);
        loading.value = false;
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
            loading.value = true;
            const response: any = await reqRoleDelete({ ids: [id] });
            loading.value = false;
            if (response.code == 0) {
                ElNotification.success('删除成功');
                // 刷新列表
                pageFunc();
            }
        }
    }
    return {
        loading,

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

export default useSetRoleStore;
