import { defineStore } from 'pinia';
import { ElMessageBox } from 'element-plus';
import {
    reqArticlePageList,
    reqArticleInfo,
    reqArticleUpdate,
    reqArticleDelete,
} from '@/api/article/article';
import router from '@/router';
let useArticleStore = defineStore('article_article', {
    state() {
        return {
            search: {
                page: 1,
                page_size: 10,
                keyword: '',
            },
            list: [],
            total: 0,

            info: {
                uuid: '',
                title: '',
                cover: '',
                detail_info: {
                    content: '',
                },
            }, //详情
            loading: false,
        };
    },
    actions: {
        async searchList() {
            this.search.page = 1;
            this.loading = true;
            const response: any = await reqArticlePageList(this.search);
            this.loading = false;
            if (response.code == 0) {
                this.list = response.data.data;
                this.total = response.data.total;
            }
        },
        async getPageList() {
            this.loading = true;
            const response: any = await reqArticlePageList(this.search);
            this.loading = false;
            if (response.code == 0) {
                this.list = response.data.data;
                this.total = response.data.total;
            }
        },
        async getInfo(uuid: string) {
            this.loading = true;
            const response: any = await reqArticleInfo({ uuid: uuid });
            this.loading = false;
            if (response.code == 0) {
                this.info = response.data;
            }
        },
        async update(data: any) {
            this.loading = true;
            const response: any = await reqArticleUpdate(data);
            this.loading = false;
            if (response.code == 0) {
                router.go(-1);
            }
        },
        async del(uuid: any) {
            const confirm = await ElMessageBox.confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
            }).catch(() => {
                console.log('取消操作！');
            });
            if (confirm == 'confirm') {
                this.loading = true;
                const response: any = await reqArticleDelete({ uuid: uuid });
                this.loading = false;
                if (response.code == 0) {
                    this.getPageList();
                }
            }
        },
    },
    getters: {},
});

export default useArticleStore;
