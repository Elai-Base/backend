<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>基础信息</span>
            </div>

            <div class="card-header-action">
                <el-button @click="router.go(-1)">返回</el-button>
            </div>
        </template>
        <el-row>
            <el-col :span="6">
                <span class="title">UUID：</span>
                <span class="content">{{ articleStore.info.uuid }}</span>
            </el-col>
            <el-col :span="6">
                <span class="title">标题：</span>
                <span class="content">{{ articleStore.info.title }}</span>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="6">
                <span class="title">封面：</span>
                <span class="content">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="articleStore.info.cover"
                        :preview-src-list="[articleStore.info.cover]"
                        :preview-teleported="true"
                    ></el-image>
                </span>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="24">
                <span class="title">内容：</span>
                <div class="content" v-html="articleStore.info.detail_info.content"></div>
            </el-col>
        </el-row>
    </el-card>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>审核</span>
            </div>
            <div class="card-header-action">
                <el-button @click="router.go(-1)">返回</el-button>
            </div>
        </template>
        <el-form label-width="120px" v-loading="articleStore.loading">
            <el-form-item label="是否通过" class="required">
                <el-radio v-model="form.state" name="1">是</el-radio>
                <el-radio v-model="form.state" name="0">否</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button @click="router.go(-1)">返回</el-button>
                <el-button type="primary" @click="adminStore.update(form)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRouter } from 'vue-router';

import useArticleStore from '@/store/article/article';
const articleStore = useArticleStore();

import useRoleStore from '@/store/set/role';
const roleStore = useRoleStore();
const form = ref({
    uuid: '',
    state: 0,
    reason: '',
});
onMounted(async () => {
    const route = useRouter();
    const query = route.currentRoute.value.query;
    if (query.uuid) {
        await articleStore.getInfo(query.uuid);
        form.value = articleStore.info;
    }
    await roleStore.getAllList();
});
</script>
