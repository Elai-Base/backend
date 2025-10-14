<template>
	<el-card>
		<div class="search">
			<div class="condition">
				<div class="group">
					<el-input
						v-model="roleStore.search.keyword"
						placeholder="请输入角色名称进行搜索"
						style="min-width: 240px"
					></el-input>
				</div>
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
					@click="goAdd()"
				>
					添加
				</el-button>
			</div>
		</div>
	</el-card>
	<el-card class="mt10">
		<el-table
			:data="roleStore.pageData.list"
			row-key="id"
			:border="true"
			v-loading="roleStore.loading"
		>
			<el-table-column
				prop="id"
				label="ID"
				width="60"
			></el-table-column>
			<el-table-column
				prop="name"
				label="角色名称"
			></el-table-column>

			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-button
						size="small"
						@click="goPush(scope.row.id)"
					>
						编辑
					</el-button>
					<el-button
						v-if="scope.row.id > 1"
						size="small"
						type="danger"
						@click="roleStore.deleteFunc(scope.row.id)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="roleStore.pageData.total"
			@paginationData="paginationData"
		></Pagination>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import router from '@/router';
import useRoleStore from '@/stores/set/role';
const roleStore = useRoleStore();

onMounted(async () => {
	await roleStore.pageFunc();
});

const search = () => {
	roleStore.search.current_page = 1;
	roleStore.pageFunc();
};

const paginationData = (val: any) => {
	roleStore.search.current_page = val.page;
	roleStore.search.page_size = val.page_size;
	roleStore.pageFunc();
};

const goAdd = () => {
	router.push({
		path: '/set/role/push',
	});
};
const goPush = (id: number) => {
	router.push({
		path: '/set/role/push',
		query: {
			id: id,
		},
	});
};
</script>
