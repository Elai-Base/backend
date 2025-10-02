<template>
    <el-card>
        <template #header>
            <span>编辑</span>
            <el-button @click="router.go(-1)">返回</el-button>
        </template>
        <el-form label-width="120px" v-loading="menuStore.loading">
            <el-form-item label="父级菜单">
                <el-select
                    class="el-col-12"
                    v-model="form.parent_id"
                    clearable
                    filterable
                    placeholder="请选择"
                >
                    <el-option label="一级菜单" :value="0"></el-option>
                    <el-option
                        v-for="item in menuStore.tree"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" class="required">
                <el-input
                    class="el-col-12"
                    v-model="form.name"
                    placeholder="请输入菜单名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="菜单地址">
                <el-input
                    class="el-col-12"
                    v-model="form.uri"
                    placeholder="请输入菜单地址"
                ></el-input>
            </el-form-item>
            <el-form-item label="ICON">
                <el-input
                    class="el-col-12"
                    v-model="form.icon"
                    placeholder="请输入iconfont的class名称,参考iconfont"
                ></el-input>
            </el-form-item>
            <el-form-item label="权重">
                <el-input
                    class="el-col-12"
                    v-model="form.weight"
                    placeholder="请输入权重，越大越靠前"
                    type="number"
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
import useMenuStore from '@/stores/set/menu';
import { MenuForm } from '@/types/set/menu';
const menuStore = useMenuStore();
const form = ref<MenuForm>({
    id: 0,
    parent_id: null,
    name: '',
    uri: '',
    icon: '',
    weight: 0,
});

onMounted(async () => {
    const route = useRouter();
    const query = route.currentRoute.value.query;
    const id: number = Number(query.id);

    if (id > 0) {
        await menuStore.infoFunc(id);
        form.value = menuStore.info;
    }
});

function update() {
    if (form.value.id && form.value.id > 0) {
        form.value.weight = Number(form.value.weight);
        menuStore.updateFunc(form.value);
    } else {
        menuStore.createFunc(form.value);
    }
}
</script>
