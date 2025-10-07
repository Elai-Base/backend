import { defineStore } from 'pinia';
import { reqAccountLogin, reqEnv, reqLoginOut } from '@/api/login';
import { ElNotification } from 'element-plus';
import router from '@/router';

import storage from '@/utils/storage';
import { LoginEnv, LoginForm, LoginRes } from '@/types/login';
import { ref } from 'vue';

let useLoginStore = defineStore('login', () => {
	const token = ref<string>('');
	token.value = storage.get('token');

	const refreshToken = ref<string>('');
	refreshToken.value = storage.get('refresh_token');

	const env = ref<LoginEnv>({
		env: '',
		client_id: '',
		timezone: '',
		timestamps: 0,
		agent: '',
		ip: '',
	});

	const loading = ref<boolean>(false);

	async function envConfigFunc() {
		const response: any = await reqEnv();
		env.value = <LoginEnv>response.data;
		if (response.code == 0) {
			storage.set('env', env.value);
			storage.set('client_id', env.value.client_id);
		}
	}

	async function accountLoginFunc(data: LoginForm) {
		loading.value = true;
		const response: any = await reqAccountLogin(data);
		loading.value = false;

		const res = <LoginRes>response.data;
		if (response.code == 0) {
			ElNotification.success('登录成功！');

			setTimeout(function () {
				token.value = res.token;
				refreshToken.value = res.refresh_token;

				storage.set('token', token.value);
				storage.set('refresh_token', refreshToken.value);
				router.push({
					path: '/',
				});
			}, 1000);
		}
	}
	async function loginOutFunc() {
		const response: any = await reqLoginOut();
		if (response.code == 0) {
			token.value = '';
			localStorage.clear();
			router.push('/login');
		}
	}

	return {
		token,
		refreshToken,
		env,
		loading,
		envConfigFunc,
		accountLoginFunc,
		loginOutFunc,
	};
});

export default useLoginStore;
