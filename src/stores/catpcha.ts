import { defineStore } from 'pinia';
import { reqCaptchaCheck, reqCaptchaGet } from '@/api/captcha';

import type { GetReq, GetRes, CheckReq, CheckRes, ClickData, SlideData } from '@/types/captcha';
import { ref } from 'vue';

let useCaptchaStore = defineStore('captcha', () => {
	// 显示隐藏验证码弹窗
	const show = ref<boolean>(false);
	// 验证码唯一标识
	const uuid = ref<string>('');
	// 业务标识
	const biz = ref<string>('');
	// 验证码类型
	const type = ref<string>('click');

	const getReq = ref<GetReq>({
		key: uuid.value,
		biz: biz.value,
		timestamp: 0,
	});

	const clickData = ref<ClickData>({
		image: '',
		thumb: '',
	});
	const slideData = ref<SlideData>({
		thumbX: 0,
		thumbY: 0,
		thumbWidth: 0,
		thumbHeight: 0,
		image: '',
		thumb: '',
	});

	const checkReq = ref<CheckReq>({
		type: type.value,
		key: uuid.value,
		biz: biz.value,
		timestamp: 0,
	});
	const checkRes = ref<CheckRes>({
		type: '',
		key: '',
		biz: '',
		token: '',
	});

	async function getFunc() {
		getReq.value.key = uuid.value;
		getReq.value.biz = biz.value;
		getReq.value.timestamp = Date.now();

		const response: any = await reqCaptchaGet(getReq.value);
		const res = <GetRes>response.data;
		if (response.code == 0) {
			type.value = res.type;
			checkReq.value.type = res.type;
			if (type.value == 'click') {
				clickData.value.image = res.master_image;
				clickData.value.thumb = res.thumb_image;
			}
			if (type.value == 'slide') {
				slideData.value.image = res.master_image;
				slideData.value.thumb = res.thumb_image;
				slideData.value.thumbX = 0;
				slideData.value.thumbY = 0;
				slideData.value.thumbWidth = res.thumb_width;
				slideData.value.thumbHeight = res.thumb_height;
			}
		}
	}
	async function checkFunc() {
		checkReq.value.key = uuid.value;
		checkReq.value.biz = biz.value;
		checkReq.value.timestamp = Date.now();
		const response: any = await reqCaptchaCheck(checkReq.value);
		if (response.code == 0) {
			checkRes.value.type = response.data.type;
			checkRes.value.key = response.data.key;
			checkRes.value.biz = response.data.biz;
			checkRes.value.token = response.data.token;
		}
	}

	return {
		show,
		uuid,
		biz,
		type,

		getReq,
		getFunc,

		clickData,
		slideData,

		checkReq,
		checkRes,
		checkFunc,
	};
});

export default useCaptchaStore;
