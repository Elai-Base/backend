<template>
	<el-card>
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
		<el-table
			class="mt10"
			:data="categoryStore.tree"
			row-key="id"
			:border="true"
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			v-loading="categoryStore.loading"
		>
			<el-table-column
				prop="name"
				label="分类名称"
			></el-table-column>

			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-button
						size="small"
						@click="showEdit(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						size="small"
						type="danger"
						@click="categoryStore.deleteFunc(scope.row.id)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
	<PushDialog v-model:config="pushConfig"></PushDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useArticleCategoryStore from '@/stores/article/category';

import PushDialog from '@/views/article/category/pushDialog.vue';
const categoryStore = useArticleCategoryStore();

onMounted(async () => {
	await categoryStore.treeFunc();
});
const pushConfig = ref({
	title: '',
	id: 0,
});
const showAdd = () => {
	categoryStore.showDialog = true;
	pushConfig.value.title = '新增';
	pushConfig.value.id = 0;
};
const showEdit = (id: number) => {
	categoryStore.showDialog = true;
	pushConfig.value.title = '编辑';
	pushConfig.value.id = id;
};
</script>
