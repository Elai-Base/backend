// 登录环境
export type LoginEnv = {
	env: string;
	client_id: string;
	timezone: string;
	timestamps: number;
	agent: string;
	ip: string;
};

// 登录表单
export interface LoginForm {
	username: string;
	password: string;
	type: number;
	captcha: string;
}

// 登录响应
export interface LoginRes {
	token: string;
	refresh_token: string;
}
