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
                    v-model="form.menu"
                    clearable
                    filterable
                    placeholder="请选择"
                    :options="menuStore.treeList"
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
import usePermissionStore from '@/store/set/permission';
const permissionStore = usePermissionStore();

import useMenuStore from '@/store/set/menu';
const menuStore = useMenuStore();

const cascaderConfig = ref({
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
});
const form = ref({
    id: 0,
    menu_id: 0,
    menu: [],
    uri: '',
});
function update() {
    form.value.menu_id = form.value.menu.pop();
    permissionStore.update(form.value);
}
onMounted(async () => {
    const route = useRouter();
    const query = route.currentRoute.value.query;
    if (query.id > 0) {
        await permissionStore.getInfo(query.id);
        form.value = permissionStore.info;
    }
});
</script>
