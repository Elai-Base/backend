<template>
    <div class="page-login">
        <div class="login-box">
            <el-form class="form" :rules="loginFormRules">
                <div class="login-title">
                    <div class="title">欢迎登录</div>
                </div>

                <el-form-item>
                    <el-input
                        placeholder="请输入账号"
                        autocomplete="new-password"
                        v-model="formData.username"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        autocomplete="new-password"
                        v-model="formData.password"
                        :show-password="true"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-login" v-loading="loginStore.loading" @click="login">
                        登录
                    </el-button>
                    <div class="action-list">
                        <div class="action">忘记密码</div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FormRules } from 'element-plus';
import useLoginStore from '@/stores/login.ts';
import { LoginForm } from '@/types/login.ts';

const loginStore = useLoginStore();

const formData = ref<LoginForm>({
    username: '',
    password: '',
    type: 0,
    captcha: '',
});

const loginFormRules = ref<FormRules>({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const login = () => {
    loginStore.accountLoginFunc(formData.value);
};
onMounted(() => {
    loginStore.envConfigFunc();
});
</script>

<style lang="scss" scoped>
.page-login {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/login-bg.png') no-repeat;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;

    .login-box {
        width: 600px;
        border: 1px solid rgba(245, 245, 245, 1);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        background: #ffffff;
        border-radius: 5px;

        .login-title {
            .title {
                text-align: center;
                font-size: 30px;
                font-weight: bold;
            }
        }

        .form {
            width: 80%;
            margin: 10% auto;

            .el-form-item {
                margin-top: 20px;
            }

            .el-input {
                height: 50px;
            }

            .btn-login {
                width: 100%;
                background-color: rgba(0, 84, 254, 1);
                color: #fff;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
            }

            .action-list {
                width: 100%;
                display: flex;
                align-items: right;
                justify-content: right;
                margin-top: 10px;

                .action {
                    color: rgba(136, 136, 136, 1);
                }
            }
        }
    }
}
</style>
