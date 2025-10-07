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
		<el-form
			label-width="120px"
			v-loading="roleStore.loading"
		>
			<el-form-item
				label="角色名称"
				class="required"
			>
				<el-input
					class="el-col-12"
					v-model="form.name"
					placeholder="请输入角色名称"
				></el-input>
			</el-form-item>

			<el-form-item
				label="权限菜单"
				class="required"
			>
				<el-tree
					:data="menuStore.tree"
					show-checkbox
					node-key="id"
					default-expand-all
					:props="defaultProps"
					ref="treeRef"
					:default-checked-keys="defaultKey"
					@check="handleCheckChange"
				></el-tree>
			</el-form-item>

			<el-form-item>
				<el-button @click="router.go(-1)">返回</el-button>
				<el-button
					type="primary"
					@click="update()"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElTree } from 'element-plus';

import router from '@/router';
import useRoleStore from '@/stores/set/role';
const roleStore = useRoleStore();

import useMenuStore from '@/stores/set/menu';
const menuStore = useMenuStore();

import { RoleForm } from '@/types/set/role';
const form = ref<RoleForm>({
	id: 0,
	name: '',
	permission: [],
});

const defaultProps = ref({
	expandTrigger: 'hover',
	value: 'id',
	label: 'name',
});
const defaultKey = ref<number[]>([]);

onMounted(async () => {
	const route = useRouter();
	const query = route.currentRoute.value.query;

	const id = Number(query.id);
	if (id > 0) {
		form.value.id = id;
		await roleStore.infoFunc(id);
		form.value = roleStore.info;
		defaultKey.value = form.value.permission;
	}
});

const handleCheckChange = (node: any, all: any) => {
	form.value.permission = all.checkedKeys;
};

function update() {
	if (form.value.id && form.value.id > 0) {
		roleStore.updateFunc(form.value);
	} else {
		roleStore.createFunc(form.value);
	}
}
</script>

<style type="sass" scoped>
.el-tree {
	min-width: 160px;
}
</style>
