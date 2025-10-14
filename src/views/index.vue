<template>
	<el-card style="max-width: 480px">
		<template #header>
			<div class="card-header">
				<span>欢迎您回来！</span>
			</div>
		</template>
		<p class="role">
			{{ adminStore.loginInfo.role_info.name }}
		</p>
		<p class="name">
			{{ adminStore.loginInfo.name }}
		</p>

		<template #footer>{{ nowDate }}</template>
	</el-card>
</template>

<script setup lang="ts">
import useSetAdminStore from '@/stores/set/admin';

const adminStore = useSetAdminStore();
const nowDate = new Date().toLocaleDateString();
</script>

<style lang="scss" scoped>
.role {
	color: #409eff;
}

.name {
	margin-top: 20px;
	font-size: 24px;
	font-weight: bold;
}
</style>
