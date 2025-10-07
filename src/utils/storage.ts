class Storage {
	get(key: string): any {
		let str: any = localStorage.getItem(key);
		let value = '';
		try {
			value = JSON.parse(str);
		} catch {
			value = str;
		}
		return value;
	}

	set(key: string, data: any) {
		let value = '';
		if (typeof data === 'object') {
			value = JSON.stringify(data);
		}
		if (typeof data === 'string') {
			value = data;
		}
		localStorage.setItem(key, value);
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}
	clear() {
		localStorage.clear();
	}
}

export default new Storage();
