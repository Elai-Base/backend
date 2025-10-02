<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>编辑</span>
            </div>
            <div class="card-header-action">
                <el-button @click="router.go(-1)">返回</el-button>
            </div>
        </template>
        <el-form label-width="120px" v-loading="permissionStore.loading">
            <el-form-item label="关联菜单" class="required">
                <el-cascader
                    class="el-col-12"
                    v-model="form.menu_path"
                    clearable
                    filterable
                    placeholder="请选择"
                    :options="menuStore.tree"
                    :props="cascaderConfig"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="接口地址" class="required">
                <el-input
                    class="el-col-12"
                    type="textarea"
                    :rows="5"
                    v-model="form.uri"
                    placeholder="请输入接口地址"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="router.go(-1)">返回</el-button>
                <el-button type="primary" @click="update()">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import router from '@/router';
import usePermissionStore from '@/stores/set/permission';
const permissionStore = usePermissionStore();

import useMenuStore from '@/stores/set/menu';
import { PermissionForm } from '@/types/set/permission';
import { ElNotification } from 'element-plus';
const menuStore = useMenuStore();

const cascaderConfig = ref({
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
});
const form = ref<PermissionForm>({
    id: 0,
    menu: '',
    menu_path: [],
    menu_id: 0,
    uri: '',
});
function update() {
    if (form.value.menu_path.length == 0) {
        ElNotification.error('请选择关联菜单');
        return;
    }

    const menuId: number = form.value.menu_path[form.value.menu_path.length - 1] || 0;
    form.value.menu_id = menuId;
    if (form.value.id && form.value.id > 0) {
        permissionStore.updateFunc(form.value);
    } else {
        permissionStore.createFunc(form.value);
    }
}
onMounted(async () => {
    const route = useRouter();
    const query = route.currentRoute.value.query;
    const id: number = Number(query.id);
    if (id > 0) {
        await permissionStore.infoFunc(id);
        form.value = permissionStore.info;
        const path: number[] = JSON.parse(permissionStore.info.menu);
        form.value.menu_path = path;
    }
});
</script>
