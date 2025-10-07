import axios from 'axios';
import { AxiosInstance } from 'axios';
import { ElNotification } from 'element-plus';
import router from '@/router';

import storage from '@/utils/storage';
import csrf from '@/utils/csrf';

class Axios {
	baseURL: string = import.meta.env.VITE_APP_BASE_API; //接口基础路径
	timeout: number = 60000; //超时时间

	instance: AxiosInstance; //axios实例
	controller: AbortController; // 中断请求

	debounce: boolean = true; // 对post请求防止短时间重复点击
	debounceTime: number = 3000; // 防抖时间

	debounceObj: { [key: string]: number } = {}; // 请求对象

	constructor() {
		// 初始化实例
		this.instance = axios.create({
			baseURL: this.baseURL,
			timeout: this.timeout,
		});
		// 初始化取消请求控制器
		this.controller = new AbortController();
		// 拦截器-请求之前
		this.req();
		// 拦截器-响应之后
		this.res();
	}

	setBaseURL(url: string) {
		this.baseURL = url;
		this.instance.defaults.baseURL = url;
	}

	setTimeout(timeout: number) {
		this.timeout = timeout;
		this.instance.defaults.timeout = timeout;
	}

	setDebounce(debounce: boolean) {
		this.debounce = debounce;
	}

	setDebounceTime(time: number) {
		this.debounceTime = time;
	}

	// 取消请求
	cancelRequest() {
		this.controller.abort();
	}

	//拦截器-请求之前
	req() {
		this.instance.interceptors.request.use((config) => {
			const timestamp = Date.now();
			csrf.setTime(timestamp);
			csrf.setKey();
			const csrfToken = csrf.genToken();

			config.signal = this.controller.signal;
			config.headers['Token'] = storage.get('token');
			config.headers['Refresh-Token'] = storage.get('refresh_token');
			config.headers['X-Client-Id'] = storage.get('client_id');
			config.headers['X-Time'] = timestamp;
			config.headers['X-Token'] = csrfToken;
			config.headers['Content-Type'] = 'application/json;charset=UTF-8';
			return config;
		});
	}

	res() {
		this.instance.interceptors.response.use(
			(response) => {
				// 对响应数据做点什么
				switch (response.data.code) {
					case 0:
						//正常返回
						break;
					case -2:
					// token失效,refreshToken可以刷新
					// 可以额外处理，目前暂未处理
					case -3:
						// 双token失效
						// 防止登录失效多个请求重复提示问题
						let isNotify: boolean = Boolean(localStorage.getItem('login-fail'));
						if (isNotify == false) {
							ElNotification.error('登录失效，请重新登录！');
						}
						localStorage.setItem('login-fail', '1');
						setTimeout(function () {
							//跳转
							router.push({
								path: '/',
							});
							//清除cache
							localStorage.clear();
							window.location.reload();
						}, 1000);
						break;
					default:
						ElNotification.error(response.data.message);
				}
				return response.data;
			},
			(error) => {
				ElNotification({
					type: 'error',
					message: error.message,
				});
				return Promise.reject(error);
			},
		);
	}
}

export default new Axios().instance;
