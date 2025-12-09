<template>
	<el-card>
		<div class="search">
			<div class="condition">
				<el-input
					v-model="adminStore.search.keyword"
					placeholder="请输入账号名称/电话"
					style="width: 240px"
				></el-input>
			</div>
			<div class="operation">
				<el-button
					type="success"
					@click="search()"
				>
					搜索
				</el-button>
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
			:data="adminStore.pageData.list"
			row-key="id"
			:border="true"
			v-loading="adminStore.loading"
		>
			<el-table-column
				prop="id"
				label="ID"
				width="60"
			></el-table-column>
			<el-table-column label="账号名称">
				<template #default="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column label="用户电话">
				<template #default="scope">
					{{ scope.row.phone }}
				</template>
			</el-table-column>
			<el-table-column label="角色">
				<template #default="scope">
					{{ scope.row.role_info.name }}
				</template>
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
						v-if="scope.row.id != 1"
						size="small"
						type="danger"
						@click="adminStore.deleteFunc(scope.row.id)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="adminStore.pageData.total"
			@paginationData="paginationData"
		></Pagination>
		<PushDialog v-model:config="pushConfig"></PushDialog>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PushDialog from '@/views/set/admin/pushDialog.vue';
import useAdminStore from '@/stores/set/admin';
const adminStore = useAdminStore();

onMounted(async () => {
	await adminStore.pageFunc();
});

const search = () => {
	adminStore.search.current_page = 1;
	adminStore.pageFunc();
};

const paginationData = (val: { page: number; page_size: number }) => {
	adminStore.search.current_page = val.page;
	adminStore.search.page_size = val.page_size;
	adminStore.pageFunc();
};

const pushConfig = ref({
	title: '',
	id: 0,
});

const showAdd = () => {
	adminStore.showDialog = true;
	pushConfig.value.title = '新增';
	pushConfig.value.id = 0;
};

const showEdit = (id: number) => {
	adminStore.showDialog = true;
	pushConfig.value.title = '编辑';
	pushConfig.value.id = id;
};
</script>
