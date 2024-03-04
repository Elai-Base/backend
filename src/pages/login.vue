<template>
    <div class="page-login">
        <div class="login">
            <div class="login-left">
                <div class="tips-1">xxx系统</div>
                <div class="image"></div>
            </div>
            <div class="login-right">
                <el-form class="form">
                    <div class="login-type">
                        <div class="type" @click="changeLoginType(1)" :class="loginType == 1 ? 'active' : ''">账号登录</div>
                        <div class="type" @click="changeLoginType(2)" :class="loginType == 2 ? 'active' : ''">手机号登录</div>
                    </div>
                    <el-form-item>
                        <el-input placeholder="请输入账号" autocomplete="new-password" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" placeholder="请输入密码" autocomplete="new-password"
                            v-model="loginForm.password" :show-password="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-loading="adminStore.loginLoading" @click="login">登录</el-button>
                        <div class="tips-list">
                            <div class="tips">忘记密码</div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useAdminStore from "@/store/admin"
const adminStore = useAdminStore()

const loginType = ref(1)
const loginForm = ref({
    username: "",
    password: "",
})

const changeLoginType = (type: number) => {
    loginType.value = type
}
const login = () => {
    adminStore.accountLogin(loginForm.value)
}
onMounted(() => {
    adminStore.getEnvConfig()
})
</script>

<style lang="scss" scoped>
.page-login {
    width: 100%;
    height: 100vh;

    .login {
        width: 1000px;
        height: 520px;
        border-radius: 8px;
        box-shadow: 0px 1px 2px 0px rgba(136, 136, 136, 45);
        margin: calc((100vh - 520px)/2) auto;
        display: flex;
        align-items: center;

        .login-left {
            width: 480px;
            height: 100%;
            background-color: rgba(108, 116, 247, 1);
            padding: 50px;

            .tips-1 {
                color: rgba(245, 245, 245, 1);
                font-size: 32px;
            }

            .tips-2 {
                margin-top: 20px;
                color: rgba(245, 245, 245, 1);
                font-size: 16px;
                font-family: AlibabaPuHui-regular;
            }

            .image {
                margin-top: 30px;
                width: 360px;
                height: 360px;

                background: url("@/assets/images/login-background.png") no-repeat;
                background-size: cover;
            }
        }

        .login-right {
            width: 100%;

            .login-type {
                margin-bottom: 50px;
                display: flex;
                justify-content: space-around;

                .type {
                    color: rgba(136, 136, 136, 1);
                    font-size: 16px;
                    cursor: pointer;
                }

                .active {
                    color: rgba(16, 16, 16, 1);
                    font-size: 16px;
                }
            }

            .form {
                width: 80%;
                margin: 10% auto;

                .el-input {
                    height: 50px;
                }

                .el-button {
                    width: 100%;
                    background-color: rgba(108, 116, 247, 1);
                    color: #fff;
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                }

                .tips-list {
                    width: 100%;
                    display: flex;
                    align-items: right;
                    justify-content: right;
                    margin-top: 10px;

                    .tips {
                        color: rgba(136, 136, 136, 1);
                        font-size: 14px;
                    }
                }
            }
        }

    }
}
</style>@/store/admin/admin