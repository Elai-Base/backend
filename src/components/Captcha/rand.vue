<template>
	<Click
		class="captcha"
		v-if="captchaStore.show && captchaStore.type == 'click'"
		:data="captchaStore.clickData"
		:events="{
			refresh: () => refresh(),
			close: () => {
				// 关闭验证码弹窗，清空 token
				captchaStore.checkRes.token = '';
				captchaStore.show = false;
			},
			confirm: (dots: Array<ClickDot>, reset: () => void) => confirmClick(dots, reset),
		}"
	>
	</Click>

	<SlideRegion
		class="captcha"
		v-if="captchaStore.show && captchaStore.type == 'slide'"
		:data="captchaStore.slideData"
		:events="{
			refresh: () => refresh(),
			close: () => {
				// 关闭验证码弹窗，清空 token
				captchaStore.checkRes.token = '';
				captchaStore.show = false;
			},
			confirm: (dot: SlideDot, reset: () => void) => confirmSlide(dot, reset),
		}"
	>
	</SlideRegion>
</template>
<script setup lang="ts">
import 'go-captcha-vue/dist/style.css';
import { Click, SlideRegion } from 'go-captcha-vue';

import useCaptchaStore from '@/stores/catpcha';
const captchaStore = useCaptchaStore();
import { watch } from 'vue';
import { ClickDot, SlideDot } from '@/types/captcha';

const emit = defineEmits(['confirm']);

// show 变化时刷新验证码
watch(
	() => captchaStore.show, // 监听的目标
	(newShow) => {
		if (newShow) {
			refresh();
		}
	},
	{ immediate: true }, // 可选：组件初始化时立即执行一次（如果需要默认刷新）
);

const refresh = async () => {
	await captchaStore.getFunc();
};
const confirmClick = async (dots: Array<ClickDot>, reset: () => void) => {
	captchaStore.checkReq.click_dot = dots;
	captchaStore.checkReq.slide_dot = { x: 0, y: 0 };
	// 清空之前的 token
	captchaStore.checkRes.token = '';
	await captchaStore.checkFunc();
	if (captchaStore.checkRes.token) {
		// 验证成功，关闭验证码弹窗，执行回调函数
		captchaStore.show = false;
		emit('confirm', captchaStore.checkRes);
		captchaStore.checkRes.token = '';
	} else {
		// 验证失败，刷新验证码
		reset();
	}
};
const confirmSlide = async (dot: SlideDot, reset: () => void) => {
	captchaStore.checkReq.click_dot = [];
	captchaStore.checkReq.slide_dot = dot;
	// 清空之前的 token
	captchaStore.checkRes.token = '';
	await captchaStore.checkFunc();
	if (captchaStore.checkRes.token) {
		// 验证成功，关闭验证码弹窗，执行回调函数
		captchaStore.show = false;
		emit('confirm', captchaStore.checkRes);
		captchaStore.checkRes.token = '';
	} else {
		// 验证失败，刷新验证码
		reset();
	}
};
</script>

<style scoped lang="scss">
.captcha {
	position: absolute;
}
</style>
