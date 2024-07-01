import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import { reqAdminPageList, reqAdminInfo, reqAdminUpdate, reqAdminDelete } from '@/api/set/admin';
import router from '@/router';
let useSetAdminStore = defineStore('set_admin', {
    state() {
        return {
            search: {
                page: 1,
                page_size: 10,
                keyword: '',
            },
            list: [],
            total: 0,

            info: null, //详情
            loading: false,
        };
    },
    actions: {
        async getPageList() {
            this.loading = true;
            const response: any = await reqAdminPageList(this.search);
            this.loading = false;
            if (response.code == 0) {
                this.list = response.data.data;
                this.total = response.data.total;
            }
        },
        async getInfo(id: number) {
            this.loading = true;
            const response: any = await reqAdminInfo({ id: id });
            this.loading = false;
            if (response.code == 0) {
                this.info = response.data;
            }
        },
        async update(data: any) {
            this.loading = true;
            const response: any = await reqAdminUpdate(data);
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
                const response: any = await reqAdminDelete({ id: id });
                this.loading = false;
                if (response.code == 0) {
                    this.getPageList();
                }
            }
        },
    },
    getters: {},
});

export default useSetAdminStore;
