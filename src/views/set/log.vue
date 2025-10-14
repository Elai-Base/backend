<template>
	<el-card>
		<div class="search">
			<div class="condition">
				<div class="group">
					<el-input
						v-model="logStore.search.keyword"
						placeholder="请输入行为/操作地址/IP进行搜索"
						style="min-width: 240px"
					></el-input>
				</div>

				<div class="group">
					<div class="label">操作者</div>
					<el-select
						style="width: 180px"
						v-model="logStore.search.admin_id"
						clearable
						filterable
						placeholder="请选择"
					>
						<el-option
							v-for="item in adminStore.all"
							:key="item.id"
							:label="item.name + '(' + item.id + ')'"
							:value="item.id"
						/>
					</el-select>
				</div>
			</div>
			<div class="operation">
				<el-button
					type="success"
					@click="search()"
				>
					搜索
				</el-button>
			</div>
		</div>
	</el-card>
	<el-card class="mt10">
		<el-table
			:data="logStore.pageData.list"
			row-key="id"
			:default-sort="{ prop: 'created_at', order: 'descending' }"
			v-loading="logStore.loading"
		>
			<el-table-column
				prop="id"
				label="id"
				width="60"
			></el-table-column>
			<el-table-column
				label="操作者"
				width="100"
			>
				<template #default="scope">
					{{ scope.row.admin_info.name }}
				</template>
			</el-table-column>
			<el-table-column
				prop="name"
				label="行为"
			></el-table-column>
			<el-table-column
				prop="url"
				label="操作地址"
			></el-table-column>
			<el-table-column
				prop="ip"
				label="IP"
			></el-table-column>
			<el-table-column
				prop="data"
				label="操作数据"
			></el-table-column>
			<el-table-column
				prop="created_at"
				label="操作时间"
				width="240"
				sortable="custom"
			></el-table-column>
		</el-table>
		<Pagination
			:total="logStore.pageData.total"
			@paginationData="paginationData"
		></Pagination>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import useSetLogStore from '@/stores/set/log';
const logStore = useSetLogStore();

import useAdminStore from '@/stores/set/admin';
const adminStore = useAdminStore();

onMounted(async () => {
	await logStore.pageFunc();
	await adminStore.allFunc();
});

function search() {
	logStore.search.current_page = 1;
	logStore.pageFunc();
}

function paginationData(val: { page: number; page_size: number }) {
	logStore.search.current_page = val.page;
	logStore.search.page_size = val.page_size;
	logStore.pageFunc();
}
</script>
