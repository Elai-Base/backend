import { defineStore } from 'pinia';
import { LoginForm } from '@/api/admin/type';
import {
    reqAccountLogin,
    reqEnvConfig,
    reqAdminInfo,
    reqCheckLogin,
    reqLoginOut,
} from '@/api/admin';
import { ElNotification } from 'element-plus';
import { setStorage, getStorage } from '@/utils/storage';
import router from '@/router';
let useAdminStore = defineStore('admin', {
    state() {
        return {
            token: getStorage('token'),
            refreshToken: getStorage('refresh_token'),
            uid: getStorage('uid'),
            loginLoading: false,
            adminInfo: {
                name: '',
                role_info: {
                    name: 'admin',
                },
            },
        };
    },
    actions: {
        async getEnvConfig() {
            const response: any = await reqEnvConfig();
            if (response.code == 0) {
                setStorage('uid', response.data.uid);
            }
        },
        async checkLogin() {
            const response: any = await reqCheckLogin();
            if (response.code == 0) {
                setStorage('token', response.data.token);
                setStorage('refresh_token', response.data.refresh_token);
                setTimeout(() => {
                    this.checkLogin();
                }, 60 * 1000);
            }
        },
        async accountLogin(data: LoginForm) {
            this.loginLoading = true;
            const response: any = await reqAccountLogin(data);
            this.loginLoading = false;
            if (response.code == 0) {
                let token = response.data.token;
                let refreshToken = response.data.refresh_token;

                setStorage('token', token);
                setStorage('refresh_token', refreshToken);
                ElNotification.success('登录成功！');
                let _this = this;
                setTimeout(function () {
                    _this.token = token;
                    _this.refreshToken = refreshToken;
                    router.push({
                        path: '/',
                    });
                }, 1000);
            }
        },
        async getInfo() {
            const response: any = await reqAdminInfo();
            if (response.code == 0) {
                setStorage('uid', response.data.uid);
                let adminInfo = response.data;
                this.adminInfo = adminInfo;
                adminInfo = JSON.stringify(adminInfo);
                localStorage.setItem('admin_info', adminInfo);
            }
        },
        async logout() {
            const response: any = await reqLoginOut();
            if (response.code == 0) {
                this.token = '';
                localStorage.clear();
                router.push('login');
            }
        },
    },
    getters: {},
});

export default useAdminStore;
