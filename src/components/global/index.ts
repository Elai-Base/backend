//引入全局组件
import SvgIcon from './SvgIcon.vue';
import ClassIcon from './ClassIcon.vue';
// ... 导入n个组件

//全局对象
const allComponent: { [key: string]: any } = { SvgIcon, ClassIcon };
export default {
    //必须使用install方法
    install(app: any) {
        //注册全局组件
        Object.keys(allComponent).forEach(key => {
            app.component(key, allComponent[key]);
        });
    },
};
