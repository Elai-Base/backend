<template>
	<el-card>
		<el-card>
			<div class="search">
				<div class="condition">
					<el-input
						v-model="articleStore.search.keyword"
						placeholder="请输入关键字进行搜索"
						style="width: 240px"
					></el-input>
				</div>
				<div class="operation">
					<el-button
						type="info"
						@click="showAdd()"
					>
						搜索
					</el-button>
				</div>
			</div>
		</el-card>
		<el-table
			:data="articleStore.pageData.list"
			row-key="id"
			:border="true"
			v-loading="articleStore.loading"
		>
			<el-table-column label="ID">
				<template #default="scope">
					{{ scope.row.uuid }}
				</template>
			</el-table-column>
			<el-table-column label="分类">
				<template #default="scope">
					{{ scope.row.category_info.name }}
				</template>
			</el-table-column>
			<el-table-column label="封面">
				<template #default="scope">
					{{ scope.row.cover }}
				</template>
			</el-table-column>
			<el-table-column label="标题">
				<template #default="scope">
					{{ scope.row.title }}
				</template>
			</el-table-column>
			<el-table-column label="发布时间">
				<template #default="scope">
					{{ scope.row.created_at }}
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-button
						size="small"
						@click="goInfo(scope.row)"
						>审核</el-button
					>
					<el-button
						v-if="scope.row.is_admin != 1"
						size="small"
						type="danger"
						@click="articleStore.del(scope.row.uuid)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="articleStore.pageData.total"
			@paginationData="paginationData"
		></Pagination>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import router from '@/router';
import useArticleStore from '@/stores/article/article';
const articleStore = useArticleStore();

onMounted(async () => {
	await articleStore.pageFunc();
});

function paginationData(val) {
	articleStore.search.page = val.page;
	articleStore.search.page_size = val.page_size;
	articleStore.getPageList();
}

function goInfo(row: any) {
	router.push({
		path: '/article/article/info',
		query: {
			uuid: row ? row.uuid : 0,
		},
	});
}
</script>
