<template>
	<div
		class="page"
		v-if="loginStore.token"
	>
		<!-- 头部导航 -->
		<Header></Header>

		<div class="page-main">
			<!-- 左侧菜单 -->
			<Side></Side>

			<div class="page-right">
				<div class="page-content">
					<router-view></router-view>
				</div>
				<Footer></Footer>
			</div>
		</div>
	</div>
	<div
		v-else
		class="page"
	>
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
	background: var(--th-body-bg-color);

	.page-main {
		display: flex;
		height: calc(100vh - var(--th-header-height));

		.page-left {
			width: var(--th-side-width);
		}
		.page-right {
			height: 100%;
			overflow-y: scroll;
			width: calc(100% - var(--th-side-width));
		}
	}

	.page-content {
		padding: 10px;
	}
}
</style>
