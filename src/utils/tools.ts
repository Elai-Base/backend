function getNowDate(format = 's') {
    let now = new Date();
    // 将时区设置为"Asia/Shanghai"
    now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    let time;
    let year = now.getFullYear(); //获取年
    let month = now.getMonth() + 1; //获取月 索引从0开始，所以要 +1
    let day = now.getDate(); //获取日
    switch (format) {
        //ms 时间戳
        case 'ms':
            time = now.getTime();
            break;
        //s 时间戳
        case 's':
            time = now.getTime();
            time = parseInt(time / 1000);
            break;
        //d 年月日
        case 'd':
            time =
                year +
                '-' +
                (month < 10 ? '0' + month : month) +
                '-' +
                (day < 10 ? '0' + day : day);
            break;
        // 年月日 时分秒
        case 'dt':
            time =
                year +
                '-' +
                (month < 10 ? '0' + month : month) +
                '-' +
                (day < 10 ? '0' + day : day) +
                ' ' +
                now.getHours() +
                ':' +
                now.getMinutes() +
                ':' +
                now.getSeconds();
            break;
        default:
            time = now.getTime();
            break;
    }
    return time;
}

export { getNowDate };
