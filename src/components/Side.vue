<template>
	<div class="page-left">
		<el-menu
			class="menu"
			:default-active="menuActive"
		>
			<div
				class="menu-item"
				v-for="item in menuStore.tree"
				:key="item.id"
			>
				<el-sub-menu
					v-if="item.children.length > 0"
					:index="'0-' + item.id"
					:class="{ 'menu-active': item.id == Number(menuActive.split('-').pop()) }"
				>
					<template #title>
						<IconFont
							:name="item.icon || ''"
							color="var(--th-menu-icon-color)"
							:fontSize="item.icon_size || '16px'"
						></IconFont>
						<span class="name"> {{ item.name }}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item
							v-for="subItem in item.children"
							:key="subItem.id"
							:index="'0-' + item.id + '-' + subItem.id"
							:class="{
								'menu-active': subItem.id == Number(menuActive.split('-').pop()),
							}"
							@click="changeMenu(subItem)"
						>
							<span class="name">
								{{ subItem.name }}
							</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-menu-item
					v-else
					:index="'0-' + item.id"
					:class="{ 'menu-active': item.id == Number(menuActive.split('-').pop()) }"
					@click="changeMenu(item)"
				>
					<template #title>
						<IconFont
							:name="item.icon || ''"
							:fontSize="item.icon_size || '16px'"
							color="var(--th-menu-icon-color)"
						></IconFont>
						<span class="name"> {{ item.name }}</span>
					</template>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import useMenuStore from '@/stores/set/menu';
import { Menu } from '@/types/set/menu';

const menuStore = useMenuStore();

onMounted(() => {
	menuStore.treeFunc();
});

const menuActive = ref('');
const router = useRouter();
watch(
	() => router.currentRoute.value,
	(newValue) => {
		// 设置面包屑导航
		let breadcrumb: any[] = [];
		newValue.matched.forEach((item: any) => {
			// 去掉菜单导航
			let path = '';
			if (item.meta.level != 1) {
				path = item.path;
			}
			breadcrumb.push({
				name: item.meta.title,
				path: path,
			});
		});
		menuStore.breadcrumb = breadcrumb;
		// 设置菜单激活项
		setMenuActive(newValue.fullPath, menuStore.tree);
	},
	{ immediate: true, deep: true },
);

function setMenuActive(nowRoute: string, menu: Menu[]) {
	menu.forEach((item) => {
		if (item.uri == nowRoute) {
			if (item.parent_id > 0) {
				menuActive.value = '0-' + item.parent_id + '-' + item.id;
			} else {
				menuActive.value = '0-' + item.id;
			}
		}
		if (item.children.length > 0) {
			setMenuActive(nowRoute, item.children);
		}
	});
}

function changeMenu(item: any) {
	router.push(item.uri);
}
</script>

<style lang="scss" scoped>
.page-left {
	background: var(--th-side-bg);

	.menu {
		width: 100%;
		.el-menu {
			width: 100%;
		}
		.name {
			font-size: 15px;
			color: var(--th-menu-name-color);
			margin-left: 6px;
		}
	}
	:deep(.el-menu) {
		border-right: none;
		background-color: transparent;
	}
	:deep(.el-sub-menu__icon-arrow) {
		color: var(--th-menu-arrow-color);
	}
	.el-menu-item:hover,
	:deep(.el-sub-menu__title:hover) {
		background: var(--th-menu-active-bg);
	}
	.menu-active {
		background: var(--th-menu-active-bg);
		.iconfont {
			color: var(--th-menu-active-color) !important;
		}
		.name {
			color: var(--th-menu-active-color);
		}
		// background: linear-gradient(
		// 	90deg,
		// 	rgba(255, 255, 255, 0.15) 0%,
		// 	rgba(74, 144, 226, 0) 100%
		// );
	}
}
</style>
