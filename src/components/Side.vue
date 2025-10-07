<template>
	<div class="page-slider">
		<div class="header">
			<div class="name">管理后台</div>
		</div>

		<el-menu
			class="menu"
			active-text-color="#0054fe"
			:default-active="menuActive"
		>
			<div
				v-for="item in menuStore.tree"
				:key="item.id"
			>
				<el-sub-menu
					v-if="item.children.length > 0"
					:index="'0-' + item.id"
				>
					<template #title>
						<class-icon :name="item.icon"></class-icon>
						<span class="name">{{ item.name }}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item
							v-for="subItem in item.children"
							:key="subItem.id"
							:index="'0-' + item.id + '-' + subItem.id"
							@click="changeMenu(item, subItem)"
						>
							<span
								class="name"
								style="margin-left: 10px"
								>{{ subItem.name }}</span
							>
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-menu-item
					v-else
					:index="'0-' + item.id"
					@click="changeMenu(item, null)"
				>
					<template #title>
						<class-icon :name="item.icon"></class-icon>
						<span class="name">{{ item.name }}</span>
					</template>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import useMenuStore from '@/stores/set/menu';
const menuStore = useMenuStore();

onMounted(() => {
	menuStore.treeFunc();
});

const menuActive = ref('');
const router = useRouter();
watch(
	() => router.currentRoute.value,
	(newValue) => {
		let breadcrumb = menuStore.getBreadcrumbFunc();
		breadcrumb = breadcrumb ? breadcrumb : [];
		if (newValue.meta.breadcrumb == '3') {
			breadcrumb.push({
				name: newValue.meta.title,
				path: newValue.path,
			});
		}
		let defaultActive = '0';
		if (breadcrumb && breadcrumb.length > 0) {
			breadcrumb.map((val: any) => {
				if (val.id && val.id > 0) {
					defaultActive = defaultActive + '-' + val.id;
				}
			});
		} else {
			defaultActive = '0-1';
		}
		menuActive.value = defaultActive;
	},
	{ immediate: true, deep: true },
);

function changeMenu(item: any, subItem: any) {
	let breadcrumb = [];
	let jumpUrl = '';
	breadcrumb.push({
		id: item.id,
		name: item.name,
		path: item.uri,
	});
	jumpUrl = item.uri;
	if (subItem) {
		breadcrumb.push({
			id: subItem.id,
			name: subItem.name,
			path: subItem.uri,
		});
		jumpUrl = subItem.uri;
	}
	menuStore.setBreadcrumbFunc(breadcrumb);
	router.push(jumpUrl);
}
</script>

<style lang="scss" scoped>
.page-slider {
	width: 240px;
	height: 100vh;
	background: #ffffff;
	box-shadow: 4px 0px 4px rgba(43, 45, 55, 0.01);

	.header {
		width: 100%;
		height: 60px;
		line-height: 60px;

		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #ccc;

		.name {
			font-size: 18px;
		}
	}

	.menu {
		.name {
			font-size: 15px;
			// color: rgba(113, 117, 121, 1);
		}
	}
}
</style>
