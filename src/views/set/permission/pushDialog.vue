<template>
	<el-dialog
		v-model="permissionStore.showDialog"
		:title="props.config.title"
		@close="permissionStore.showDialog = false"
		width="640px"
	>
		<el-form
			label-width="120px"
			v-loading="permissionStore.loading"
		>
			<el-form-item
				label="关联菜单"
				class="required"
			>
				<el-cascader
					class="el-col-18"
					v-model="form.menu_path"
					clearable
					filterable
					placeholder="请选择"
					:options="menuStore.tree"
					:props="cascaderConfig"
				></el-cascader>
			</el-form-item>
			<el-form-item
				label="接口地址"
				class="required"
			>
				<el-input
					class="el-col-18"
					type="textarea"
					:rows="5"
					v-model="form.uri"
					placeholder="请输入接口地址"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="permissionStore.showDialog = false">返回</el-button>
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

import usePermissionStore from '@/stores/set/permission';
const permissionStore = usePermissionStore();

import useMenuStore from '@/stores/set/menu';
import { PermissionForm } from '@/types/set/permission';
import { ElNotification } from 'element-plus';
const menuStore = useMenuStore();

const cascaderConfig = ref({
	expandTrigger: 'hover',
	value: 'id',
	label: 'name',
});
const form = ref<PermissionForm>({
	id: 0,
	menu: '',
	menu_path: [],
	menu_id: 0,
	uri: '',
});

watch(
	() => permissionStore.showDialog,
	async (newVal) => {
		if (newVal) {
			form.value.id = props.config.id;
			form.value.menu = '';
			form.value.menu_path = [];
			form.value.menu_id = 0;
			form.value.uri = '';
			if (props.config.id > 0) {
				await permissionStore.infoFunc(props.config.id);
				form.value = permissionStore.info;
				const path: number[] = JSON.parse(permissionStore.info.menu);
				form.value.menu_path = path;
			}
		}
	},
);

function update() {
	if (form.value.menu_path.length == 0) {
		ElNotification.error('请选择关联菜单');
		return;
	}

	const menuId: number = form.value.menu_path[form.value.menu_path.length - 1] || 0;
	form.value.menu_id = menuId;
	if (form.value.id && form.value.id > 0) {
		permissionStore.updateFunc(form.value);
	} else {
		permissionStore.createFunc(form.value);
	}
}
</script>
