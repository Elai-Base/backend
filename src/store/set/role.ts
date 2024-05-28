import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqRolePageList,
    reqRoleAllList,
    reqRoleInfo,
    reqRoleUpdate,
    reqRoleDelete,
} from '@/api/set/role';
import router from '@/router';
let useSetRoleStore = defineStore('set_role', {
    state() {
        return {
            search: {
                page: 1,
                page_size: 10,
                keyword: '',
            },
            list: [],
            allList: [],
            total: 0,
            info: null, //详情
            loading: false,
        };
    },
    actions: {
        async getPageList() {
            this.loading = true;
            const response: any = await reqRolePageList(this.search);
            this.loading = false;
            if (response.code == 0) {
                this.list = response.data.data;
                this.total = response.data.total;
            } else {
                ElNotification.error(response.message);
            }
        },
        async getAllList() {
            this.loading = true;
            const response: any = await reqRoleAllList();
            this.loading = false;
            if (response.code == 0) {
                this.allList = response.data;
            }
        },
        async getInfo(id: number) {
            this.loading = true;
            const response: any = await reqRoleInfo({ id: id });
            this.loading = false;
            if (response.code == 0) {
                this.info = response.data;
            } else {
                ElNotification.error(response.message);
            }
        },
        async update(data: any) {
            this.loading = true;
            const response: any = await reqRoleUpdate(data);
            this.loading = false;
            if (response.code == 0) {
                router.go(-1);
            } else {
                ElNotification.error(response.message);
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
                const response: any = await reqRoleDelete({ id: id });
                this.loading = false;
                if (response.code == 0) {
                    this.getPageList();
                } else {
                    ElNotification.error(response.message);
                }
            }
        },
    },
    getters: {},
});

export default useSetRoleStore;
