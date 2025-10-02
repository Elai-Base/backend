import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqMenuTreeList,
    reqMenuInfo,
    reqMenuCreate,
    reqMenuUpdate,
    reqMenuDelete,
} from '@/api/set/menu';
import storage from '@/utils/storage';
import router from '@/router';
import { ref } from 'vue';
import { Breadcrumb, Menu, MenuForm } from '@/types/set/menu';

let useSetMenuStore = defineStore('set-menu', () => {
    const breadcrumb = ref<Breadcrumb[] | null | undefined>([]);
    const tree = ref<Menu[]>([]);

    const info = ref<Menu>({
        id: 0,
        parent_id: 0,
        name: '',
        uri: null,
        icon: '',
        weight: 0,
        children: [],
    });

    const loading = ref<boolean>(false);

    function setBreadcrumbFunc(breadcrumb: any) {
        breadcrumb.value = breadcrumb;
        storage.set('breadcrumb', breadcrumb);
    }
    function getBreadcrumbFunc() {
        breadcrumb.value = storage.get('breadcrumb');
        return breadcrumb.value;
    }
    async function treeFunc() {
        loading.value = true;
        const response: any = await reqMenuTreeList();
        loading.value = false;
        if (response.code == 0) {
            tree.value = <Menu[]>response.data;
        }
    }
    async function infoFunc(id: number) {
        loading.value = true;
        const response: any = await reqMenuInfo(id);
        loading.value = false;
        if (response.code == 0) {
            info.value = <Menu>response.data;
        }
    }
    async function createFunc(data: MenuForm) {
        loading.value = true;
        const response: any = await reqMenuCreate(data);
        loading.value = false;
        if (response.code == 0) {
            ElNotification.success('创建成功');
            router.go(-1);
        }
    }
    async function updateFunc(data: any) {
        loading.value = true;
        const response: any = await reqMenuUpdate(data);
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
            const response: any = await reqMenuDelete({ ids: [id] });
            loading.value = false;
            if (response.code == 0) {
                ElNotification.success('删除成功');
                // 删除成功后刷新列表
                treeFunc();
            }
        }
    }

    return {
        loading,
        breadcrumb,
        setBreadcrumbFunc,
        getBreadcrumbFunc,

        tree,
        treeFunc,

        info,
        infoFunc,

        createFunc,
        updateFunc,
        deleteFunc,
    };
});

export default useSetMenuStore;
