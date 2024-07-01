import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqPermissionTreeList,
    reqPermissionInfo,
    reqPermissionUpdate,
    reqPermissionDelete,
} from '@/api/set/permission';
import router from '@/router';
let useSetPermissionStore = defineStore('set_permission', {
    state() {
        return {
            tree: [],
            list: [],
            info: null, //详情
            loading: false,
        };
    },
    actions: {
        async getTreeList() {
            this.loading = true;
            const response: any = await reqPermissionTreeList();
            this.loading = false;
            if (response.code == 0) {
                this.tree = response.data;
            }
        },
        async getInfo(id: number) {
            this.loading = true;
            const response: any = await reqPermissionInfo({ id: id });
            this.loading = false;
            if (response.code == 0) {
                this.info = response.data;
            }
        },
        async update(data: any) {
            this.loading = true;
            const response: any = await reqPermissionUpdate(data);
            this.loading = false;
            if (response.code == 0) {
                router.go(-1);
            }
        },
        async del(id: any) {
            const confirm = await ElMessageBox.confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
            }).catch(() => {
                console.log('取消操作！');
            });
            if (confirm == 'confirm') {
                this.loading = true;
                const response: any = await reqPermissionDelete({ id: id });
                this.loading = false;
                if (response.code == 0) {
                    this.getTreeList();
                }
            }
        },
    },
    getters: {},
});

export default useSetPermissionStore;
