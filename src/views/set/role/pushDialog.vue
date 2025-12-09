<template>
	<el-dialog
		v-model="roleStore.showDialog"
		:title="config.title"
		@close="roleStore.showDialog = false"
		width="600px"
	>
		<el-form
			label-width="120px"
			v-loading="roleStore.loading"
		>
			<el-form-item
				label="角色名称"
				class="required"
			>
				<el-input
					class="el-col-18"
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
				<el-button @click="roleStore.showDialog = false">关闭</el-button>
				<el-button
					type="primary"
					@click="update()"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElTree } from 'element-plus';

const props = defineProps({
	config: {
		type: Object,
		default: () => ({
			title: '新增',
			id: 0,
		}),
	},
});

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

watch(
	() => roleStore.showDialog,
	async (newVal) => {
		if (newVal) {
			// 弹窗打开时，刷新菜单树
			form.value.permission = [];
			form.value.name = '';
			form.value.id = props.config.id;
			if (props.config.id > 0) {
				await roleStore.infoFunc(props.config.id);
				form.value = roleStore.info;
			}
			defaultKey.value = form.value.permission;
		}
	},
);

const defaultProps = ref({
	expandTrigger: 'hover',
	value: 'id',
	label: 'name',
});
const defaultKey = ref<number[]>([]);

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
