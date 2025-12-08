<template>
	<div class="page-login">
		<div class="login-box">
			<el-form class="form">
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
					<el-button
						class="btn-login"
						v-loading="loginStore.loading"
						@click="login()"
					>
						登录
					</el-button>
					<div class="action-list">
						<div class="action">忘记密码</div>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<RandomCaptcha
			@confirm="
				(res) => {
					// 设置验证码结果
					formData.captcha = res;
					login();
				}
			"
		></RandomCaptcha>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useLoginStore from '@/stores/login';
import useCaptchaStore from '@/stores/catpcha';
import { LoginForm } from '@/types/login';
import RandomCaptcha from '@/components/Captcha/rand.vue';
import { ElNotification } from 'element-plus';
const loginStore = useLoginStore();

const formData = ref<LoginForm>({
	username: '',
	password: '',
	captcha: {
		type: '',
		key: '',
		biz: 'login',
		token: '',
	},
});
const captchaStore = useCaptchaStore();

const login = () => {
	// 校验账号密码
	if (!formData.value.username || !formData.value.password) {
		ElNotification.error('请输入账号密码');
		return;
	}
	// 校验验证码
	if (!formData.value.captcha.token) {
		captchaStore.show = true;
		captchaStore.uuid = formData.value.username;
		captchaStore.biz = 'login';
		return;
	}
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
