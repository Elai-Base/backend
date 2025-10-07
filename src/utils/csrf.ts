import storage from '@/utils/storage';
// @ts-ignore
import CryptoJS from 'crypto-js';

class CSRF {
	timestamp: number = 0; //当前时间戳
	client_id: string = ''; // 客户端id
	key: string = ''; // key
	token: string = ''; // 令牌

	setTime(time: number) {
		this.timestamp = time;
	}

	setClientId() {
		this.client_id = storage.get('client_id');
	}

	genToken(): string {
		this.setClientId();
		this.setKey();
		const obj = {
			timestamp: this.timestamp,
			client_id: this.client_id,
			key: this.key,
		};
		const j: string = JSON.stringify(obj);
		this.token = CryptoJS.SHA256(j).toString();
		return this.token;
	}

	setKey() {
		const obj = {
			timestamp: this.timestamp,
			key: import.meta.env.VITE_APP_CSRF_KEY,
		};
		const j: string = JSON.stringify(obj);
		this.key = CryptoJS.MD5(j).toString();
	}
}
export default new CSRF();
