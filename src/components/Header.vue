<template>
	<div class="page-header">
		<div class="header-name">管理后台</div>
		<div class="header-breadcrumb">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item
					v-for="item in menuStore.breadcrumb"
					:key="item.name"
					:to="item.path"
				>
					{{ item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="header-right">
			<div class="account-box">
				{{ adminStore.loginInfo.name }}({{ adminStore.loginInfo.role_info.name }})
			</div>

			<div class="message-box"></div>

			<div class="set-box">
				<el-dropdown>
					<IconFont
						name="set"
						color="var(--th-header-color)"
						fontSize="24px"
					></IconFont>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="showTheme()">设置主题</el-dropdown-item>
							<el-dropdown-item @click="loginOut()">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>

		<!-- 主题选择弹窗 -->
		<Theme
			v-model:config="themeConfig"
			@update:config="handleUpdateConfig"
		></Theme>
	</div>
</template>

<script setup lang="ts">
import Theme from '@/components/dialog/Theme.vue';
import useSetAdminStore from '@/stores/set/admin';
const adminStore = useSetAdminStore();
adminStore.loginInfoFunc();

import useMenuStore from '@/stores/set/menu';
const menuStore = useMenuStore();

import useLoginStore from '@/stores/login';
import { onMounted, ref } from 'vue';
import storage from '@/utils/storage';
import IconFont from './global/IconFont.vue';
const loginStore = useLoginStore();
const loginOut = () => {
	loginStore.loginOutFunc();
};

// 设置主题
const themeConfig = ref({
	theme: 'default',
	show: false,
	title: '切换主题',
});
onMounted(() => {
	const theme = storage.get('theme');
	themeConfig.value.theme = theme || 'default';
	setTheme();
});
const setTheme = () => {
	document.documentElement.setAttribute('data-theme', themeConfig.value.theme);
};

const handleUpdateConfig = (val: typeof themeConfig.value) => {
	themeConfig.value = val;
	storage.set('theme', val.theme);
	setTheme();
};

// 显示主题选择弹窗
const showTheme = () => {
	themeConfig.value.show = true;
};
</script>

<style lang="scss" scoped>
.page-header {
	display: flex;
	align-items: center;

	height: var(--th-header-height);
	line-height: var(--th-header-line-height);

	background: var(--th-header-bg);
	color: var(--th-header-color);

	border-bottom: 1px solid #eee;
	box-shadow: 0px 4px 4px rgba(43, 45, 55, 0.01);

	.header-name {
		width: var(--th-side-width);
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}

	.header-breadcrumb {
		margin-left: 10px;
		:deep(.el-breadcrumb__inner) {
			color: var(--th-header-color);
		}
	}

	.header-right {
		padding: 10px;
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: center;

		.color-change-box {
			width: 100px;
			height: 100%;

			.btn {
				width: 100%;
				height: 32px;
				line-height: 32px;
				border-radius: 16px;
				text-align: center;

				img {
					width: 16px;
					height: 16px;
					vertical-align: middle;
				}

				span {
					font-size: 13px;
				}
			}
		}

		.account-box {
			margin-left: 20px;
			font-size: 14px;
		}

		.message-box {
			margin-left: 20px;

			.icon-message-notice {
				font-size: 22px;
			}
		}

		.set-box {
			margin-left: 20px;
			height: 100%;
			line-height: 100%;

			.icon-set {
				font-size: 22px;
			}
		}
	}
}
</style>
