import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqPermissionTreeList,
    reqPermissionInfo,
    reqPermissionUpdate,
    reqPermissionDelete,
    reqPermissionCreate,
} from '@/api/set/permission';
import router from '@/router';
import { Menu, Permission, PermissionForm } from '@/types/set/permission';
import { ref } from 'vue';
let useSetPermissionStore = defineStore('set-permission', () => {
    const loading = ref<boolean>(false);

    const tree = ref<Menu[]>([]);

    const info = ref<Permission>({
        id: 0,
        menu: '',
        menu_path: [],
        menu_id: 0,
        uri: '',
    });

    async function treeFunc() {
        loading.value = true;
        const response: any = await reqPermissionTreeList();
        loading.value = false;
        if (response.code == 0) {
            tree.value = <Menu[]>response.data;
        }
    }
    async function infoFunc(id: number) {
        loading.value = true;
        const response: any = await reqPermissionInfo(id);
        loading.value = false;
        if (response.code == 0) {
            info.value = response.data;
        }
    }
    async function createFunc(data: PermissionForm) {
        loading.value = true;
        const response: any = await reqPermissionCreate(data);
        loading.value = false;
        if (response.code == 0) {
            ElNotification.success('创建成功');
            router.go(-1);
        }
    }
    async function updateFunc(data: PermissionForm) {
        loading.value = true;
        const response: any = await reqPermissionUpdate(data);
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
            const response: any = await reqPermissionDelete({ ids: [id] });
            loading.value = false;
            if (response.code == 0) {
                ElNotification.success('删除成功');
                treeFunc();
            }
        }
    }
    return {
        loading,
        tree,
        treeFunc,

        info,
        infoFunc,

        createFunc,
        updateFunc,
        deleteFunc,
    };
});

export default useSetPermissionStore;
