<template>
	<el-card>
		<div class="search">
			<div class="condition"></div>
			<div class="operation">
				<el-button
					type="primary"
					@click="goAdd()"
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
			<el-table-column label="接口地址">
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
							@click="goPush(scope.row.permission)"
						>
							编辑
						</el-button>
						<el-button
							size="small"
							type="danger"
							@click="permissionStore.del(scope.row.permission.id)"
						>
							删除
						</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import router from '@/router';
import usePermissionStore from '@/stores/set/permission';
const permissionStore = usePermissionStore();

onMounted(async () => {
	await permissionStore.treeFunc();
});

const goAdd = () => {
	router.push({
		path: '/set/permission/push',
	});
};

const goPush = (id: number) => {
	router.push({
		path: '/set/permission/push',
		query: {
			id: id,
		},
	});
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
