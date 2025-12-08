// 验证码配置
export type ClickConfig = {
	width?: number;
	height?: number;
	thumbWidth?: number;
	thumbHeight?: number;
	verticalPadding?: number;
	horizontalPadding?: number;
	showTheme?: boolean;
	title?: string;
	buttonText?: string;
	iconSize?: number;
	dotSize?: number;
};

export type ClickData = {
	image: string;
	thumb: string;
};

export type ClickDot = {
	key: number;
	index: number;
	x: number;
	y: number;
};

// config = {}
export type SlideConfig = {
	width?: number;
	height?: number;
	thumbWidth?: number;
	thumbHeight?: number;
	verticalPadding?: number;
	horizontalPadding?: number;
	showTheme?: boolean;
	title?: string;
	iconSize?: number;
	scope?: boolean;
};

export type SlideData = {
	thumbX: number;
	thumbY: number;
	thumbWidth: number;
	thumbHeight: number;
	image: string;
	thumb: string;
};

export type SlideDot = {
	x: number;
	y: number;
};

// 验证码请求
export type GetReq = {
	key: string;
	biz: string;
	timestamp: number;
};

// 验证码响应
export type GetRes = {
	type: string;
	master_image: string;
	thumb_image: string;
	thumb_width: number;
	thumb_height: number;
};

// 验证码校验请求
export type CheckReq = {
	type: string;
	key: string;
	biz: string;
	timestamp: number;
	click_dot?: ClickDot[];
	slide_dot?: SlideDot;
};

// 验证码校验响应
export type CheckRes = {
	type: string;
	key: string;
	biz: string;
	token: string;
};
