<template>
    <div class="page" v-if="loginStore.token">
        <!-- 左侧菜单 -->
        <Side></Side>

        <div class="page-right">
            <!-- 顶面导航 -->
            <Header></Header>
            <div class="page-content">
                <router-view></router-view>
            </div>
            <Footer></Footer>
        </div>
    </div>
    <div v-else class="page">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Side from '@/components/Side.vue';
import router from './router';
import useLoginStore from '@/stores/login.ts';
const loginStore = useLoginStore();
if (!loginStore.token) {
    router.push({
        path: '/login',
    });
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
    background: #f5f6f7;
    display: flex;

    .page-right {
        width: calc(100% - 240px);
    }

    .page-header {
        width: 100%;
        height: 60px;
    }

    .page-content {
        padding: 10px;
        box-sizing: border-box;
    }
}
</style>
