<template>
	<div class="page-login">
		<div class="login-box">
				<div class="login-title">
					<div class="title">欢迎登录</div>
				</div>
			<el-form class="login-form">
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
import type { LoginForm } from '@/types/login';
import RandomCaptcha from '@/components/captcha/Rand.vue';
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
	background: linear-gradient(135deg, #165DFF 0%, #0F48C9 100%);


	display: flex;
	align-items: center;
	justify-content: center;

	.login-box {
		width: 600px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
		background: #ffffff;
		border-radius: 12px;

		.login-title {
			margin-top: 40px;
			.title {
				text-align: center;
				font-size: 24px;
				font-weight: bold;
			}
		}

		.login-form {
			width: 80%;
			margin: 24px auto;

			.el-input {
				height: 50px;
			}

			.btn-login {
				width: 100%;
				background: #165DFF;
				color: #fff;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				cursor: pointer;
				letter-spacing: 3px;
			}

			.action-list {
				width: 100%;
				display: flex;
				align-items: right;
				justify-content: right;
				margin-top: 10px;

				.action {
					color: rgba(136, 136, 136, 1);
					cursor: pointer;
				}
			}
		}
	}
}
</style>
