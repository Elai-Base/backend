<template>
	<el-dialog
		v-model="adminStore.showDialog"
		:title="config.title"
		@close="adminStore.showDialog = false"
		width="500px"
	>
		<el-form
			label-width="120px"
			v-loading="adminStore.loading"
		>
			<el-form-item
				label="角色"
				class="required"
			>
				<el-select
					class="el-col-18"
					v-model="form.role_id"
					placeholder="请选择"
					:disabled="form.id == 1 ? true : false"
				>
					<el-option
						v-for="(item, index) in roleStore.all"
						:key="index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item
				label="账号"
				class="required"
			>
				<el-input
					class="el-col-18"
					v-model="form.name"
					placeholder="请输入账号"
				></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				class="required"
			>
				<el-input
					class="el-col-18"
					v-model="form.password"
					placeholder="请输入密码"
					type="password"
				></el-input>
			</el-form-item>

			<el-form-item
				label="手机号"
				class="required"
			>
				<el-input
					class="el-col-18"
					v-model="form.phone"
					placeholder="请输入手机号"
					type="number"
				></el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="adminStore.showDialog = false">返回</el-button>
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

const props = defineProps({
	config: {
		type: Object,
		default: () => ({
			title: '新增',
			id: 0,
		}),
	},
});

import useAdminStore from '@/stores/set/admin';
const adminStore = useAdminStore();

import useRoleStore from '@/stores/set/role';
import { AdminForm } from '@/types/set/admin';
const roleStore = useRoleStore();
const form = ref<AdminForm>({
	id: 0,
	role_id: 1,
	name: '',
	password: '',
	phone: null,
});

watch(
	() => adminStore.showDialog,
	async (newVal) => {
		if (newVal) {
			// 弹窗打开时，刷新菜单树
			form.value.id = props.config.id;
			form.value.role_id = 1;
			form.value.name = '';
			form.value.password = '';
			form.value.phone = null;
			if (props.config.id > 0) {
				await adminStore.infoFunc(props.config.id);
				form.value = adminStore.info;
				form.value.password = '******';
			}
			roleStore.allFunc();
		}
	},
);

const update = () => {
	if (form.value.id && form.value.id > 0) {
		adminStore.updateFunc(form.value);
	} else {
		adminStore.createFunc(form.value);
	}
};
</script>

<style lang="scss">
.manager-department {
	.el-tree-node.is-expanded > .el-tree-node__children {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.el-tree-node__children > div {
		width: 20%;
	}
}
</style>
