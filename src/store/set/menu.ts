import { defineStore } from "pinia";
import { ElMessageBox, ElNotification } from "element-plus";
import {
  reqMenuTreeList,
  reqMenuInfo,
  reqMenuUpdate,
  reqMenuDelete,
} from "@/api/set/menu";
import { getStorage, setStorage } from "@/utils/storage";
import router from "@/router";
let useSetMenuStore = defineStore("set_menu", {
  state() {
    return {
      breadcrumb: [], //面包屑导航
      allList: [], //所有列表
      treeList: [], //树状菜单,
      info: null, //详情
      loading: false,
    };
  },
  actions: {
    setBreadcrumb(breadcrumb: any) {
      this.breadcrumb = breadcrumb;
      setStorage("breadcrumb", breadcrumb);
    },
    getBreadcrumb() {
      let breadcrumb: any = getStorage("breadcrumb");
      this.breadcrumb = breadcrumb;
      return breadcrumb;
    },
    async getTreeList() {
      this.loading = true;
      const response: any = await reqMenuTreeList();
      this.loading = false;
      if (response.code == 0) {
        this.treeList = response.data;
      } else {
        ElNotification.error(response.message);
      }
    },
    async getInfo(id: number) {
      this.loading = true;
      const response: any = await reqMenuInfo({ id: id });
      this.loading = false;
      if (response.code == 0) {
        this.info = response.data;
      } else {
        ElNotification.error(response.message);
      }
    },
    async update(data: any) {
      this.loading = true;
      const response: any = await reqMenuUpdate(data);
      this.loading = false;
      if (response.code == 0) {
        router.go(-1);
      } else {
        ElNotification.error(response.message);
      }
    },
    async del(id: any) {
      const confirm = await ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).catch(() => {
        console.log("取消操作！");
      });
      if (confirm == "confirm") {
        this.loading = true;
        const response: any = await reqMenuDelete({ id: id });
        this.loading = false;
        if (response.code == 0) {
          this.getTreeList();
        } else {
          ElNotification.error(response.message);
        }
      }
    },
  },
  getters: {},
});

export default useSetMenuStore;
