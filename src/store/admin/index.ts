import { defineStore } from 'pinia'
import { LoginForm } from '@/api/admin/type'
import { reqAccountLogin, reqEnvConfig, reqAdminInfo } from '@/api/admin'
import { ElNotification } from 'element-plus'
import { setStorage, getStorage } from '@/utils/storage'
import router from '@/router'
let useAdminStore = defineStore('admin', {
    state() {
        return {
            token: getStorage('token'),
            refreshToken: getStorage('refresh_token'),
            uid: getStorage('uid'),
            loginLoading: false,
            adminInfo: {
                name: "",
                role_info: {
                    name: "admin",
                }
            },
        }
    },
    actions: {
        async getEnvConfig() {
            const response: any = await reqEnvConfig();
            if (response.code == 0) {
                setStorage('uid', response.data.uid);
            } else {
                ElNotification.error(response.message);
            }
        },
        async accountLogin(data: LoginForm) {
            this.loginLoading = true
            const response: any = await reqAccountLogin(data);
            this.loginLoading = false
            if (response.code == 0) {
                let token = response.data.token;
                let refreshToken = response.data.refresh_token;
                this.token = token
                this.refreshToken = refreshToken
                setStorage('token', token);
                setStorage('refresh_token', refreshToken);
                setStorage('admin_info', response.data.admin_info);
                ElNotification.success("登录成功！");
                setTimeout(function () {
                    router.push({
                        path: '/'
                    })
                }, 200)
            } else {
                ElNotification.error(response.message);
            }
        },
        async getInfo() {
            const response: any = await reqAdminInfo();
            if (response.code == 0) {
                setStorage('uid', response.data.uid);
                let adminInfo = response.data;
                this.adminInfo = adminInfo;
                adminInfo = JSON.stringify(adminInfo);
                localStorage.setItem("admin_info", adminInfo);
            } else {
                ElNotification.error(response.message);
            }
        },
    },
    getters: {}
})

export default useAdminStore;