import { createApp } from 'vue';
import App from './App.vue';
//引入ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-ignore 忽略提示错误 要不然打包会出错
//国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
//引入svg
import 'virtual:svg-icons-register';
//引入全局组件
import globalComponent from '@/components/global';
//引入全局样式
import '@/assets/css/index.scss';
//引入iconfont
import '@/assets/iconfont/iconfont.css'
//引入路由
import router from './router'
import pinia from './store';
//引入pinia
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus, {
    locale: zhCn,
});
//use全局组件
app.use(globalComponent);
app.mount('#app');
