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
			:data="menuStore.tree"
			row-key="id"
			:border="true"
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			v-loading="menuStore.loading"
		>
			<el-table-column
				prop="name"
				label="菜单名称"
			></el-table-column>
			<el-table-column
				prop="uri"
				label="地址"
			></el-table-column>
			<el-table-column
				prop="weight"
				label="权重"
			></el-table-column>
			<el-table-column label="图标">
				<template #default="scope">
					<IconFont
						:name="scope.row.icon"
						:fontSize="scope.row.icon_size"
					></IconFont>
				</template>
			</el-table-column>
			<el-table-column
				label="图标大小"
				prop="icon_size"
			>
			</el-table-column>
			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-button
						size="small"
						@click="showEdit(scope.row.id)"
					>
						编辑
					</el-button>
					<el-button
						size="small"
						type="danger"
						@click="menuStore.deleteFunc(scope.row.id)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
	<PushDialog v-model:config="pushConfig"></PushDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PushDialog from './pushDialog.vue';
import useMenuStore from '@/stores/set/menu';
const menuStore = useMenuStore();

onMounted(() => {
	menuStore.treeFunc();
});

const pushConfig = ref({
	title: '',
	id: 0,
});
const showAdd = () => {
	menuStore.showDialog = true;
	pushConfig.value.title = '新增';
	pushConfig.value.id = 0;
};

const showEdit = (id: number) => {
	menuStore.showDialog = true;
	pushConfig.value.title = '编辑';
	pushConfig.value.id = id;
};
</script>
