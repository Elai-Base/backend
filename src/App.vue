<template>
    <div class="page" v-if="adminStore.token">
        <!-- 左侧菜单 -->
        <Side></Side>

        <div class="page-right">
            <!-- 顶面导航 -->
            <Header> </Header>
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
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Side from "@/components/Side.vue"
import router from './router';
import useAdminStore from "@/store/admin"
const adminStore = useAdminStore()
if (!adminStore.token) {
    router.push({
        path: '/login'
    })
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
    background: $base-color;
    display: flex;

    .page-right {
        width: calc(100% - $base-menu-width);
    }

    .page-header {
        width: 100%;
        height: $base-header-height;
        background: $base-header-background;
    }

    .page-content {
        padding: 10px;
        box-sizing: border-box;
    }
}
</style>