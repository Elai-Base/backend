function getStorage(key: string) {
    let string: any = localStorage.getItem(key);
    let value = '';
    try {
        value = JSON.parse(string);
    } catch {
        value = string;
    }
    return value;
}

function setStorage(key: string, data: any) {
    let value = '';
    if (typeof data === 'object') {
        value = JSON.stringify(data);
    }
    if (typeof data === 'string') {
        value = data;
    }
    localStorage.setItem(key, value);
}

function removeStorage(key: string) {
    localStorage.removeItem(key);
}

function clearStorage() {
    localStorage.clear();
}
export { getStorage, setStorage, removeStorage, clearStorage };
