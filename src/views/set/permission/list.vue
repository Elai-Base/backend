<template>
	<el-card>
		<div class="search">
			<div class="condition"></div>
			<div class="operation">
				<el-button
					type="primary"
					@click="showAdd()"
				>
					添加
				</el-button>
			</div>
		</div>
	</el-card>
	<el-card class="mt10">
		<el-table
			:data="permissionStore.tree"
			row-key="id"
			:border="true"
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			v-loading="permissionStore.loading"
		>
			<el-table-column
				prop="name"
				label="关联菜单"
			></el-table-column>
			<el-table-column label="接口权限">
				<template #default="scope">
					<span v-html="urlFilter(scope.row.permission.uri)"></span>
				</template>
			</el-table-column>

			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-row v-if="scope.row.permission.id">
						<el-button
							size="small"
							@click="showEdit(scope.row.permission.id)"
						>
							编辑
						</el-button>
						<el-button
							size="small"
							type="danger"
							@click="permissionStore.deleteFunc(scope.row.permission.id)"
						>
							删除
						</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
	<PushDialog :config="pushConfig"></PushDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PushDialog from './pushDialog.vue';
import usePermissionStore from '@/stores/set/permission';
const permissionStore = usePermissionStore();

onMounted(async () => {
	await permissionStore.treeFunc();
});

const pushConfig = ref({
	title: '',
	id: 0,
});

const showAdd = () => {
	permissionStore.showDialog = true;
	pushConfig.value.title = '新增';
	pushConfig.value.id = 0;
};

const showEdit = (id: number) => {
	permissionStore.showDialog = true;
	pushConfig.value.title = '编辑';
	pushConfig.value.id = id;
};

const urlFilter = (url: string) => {
	//替换所有的换行符
	if (url) {
		url = url.replace(/\r\n/g, '<br>');
		url = url.replace(/\n/g, '<br>');
	}
	return url;
};
</script>
