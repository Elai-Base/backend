import { defineStore } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
    reqArticleCategoryTreeList,
    reqArticleCategoryInfo,
    reqArticleCategoryUpdate,
    reqArticleCategoryDelete,
} from '@/api/article/category';
import router from '@/router';
let useArticleCategoryStore = defineStore('article_category', {
    state() {
        return {
            treeList: [], //树状菜单,
            info: null, //详情
            loading: false,
        };
    },
    actions: {
        async getTreeList() {
            this.loading = true;
            const response: any = await reqArticleCategoryTreeList();
            this.loading = false;
            if (response.code == 0) {
                this.treeList = response.data;
            }
        },
        async getInfo(id: number) {
            this.loading = true;
            const response: any = await reqArticleCategoryInfo({ id: id });
            this.loading = false;
            if (response.code == 0) {
                this.info = response.data;
            }
        },
        async update(data: any) {
            this.loading = true;
            const response: any = await reqArticleCategoryUpdate(data);
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
                const response: any = await reqArticleCategoryDelete({ id: id });
                this.loading = false;
                if (response.code == 0) {
                    this.getTreeList();
                }
            }
        },
    },
    getters: {},
});

export default useArticleCategoryStore;
