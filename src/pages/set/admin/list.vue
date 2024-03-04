<template>
	<el-card>
		<div class="search">
			<el-row>
				<el-col :span="2" :offset="22">
					<el-button type="primary" @click="goAdd()">添加</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table :data="listData.data" row-key="id" border v-loading="loading">
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
			<el-table-column label="操作" width="180">
				<template #default="scope">
					<el-button size="small" @click="goEdit(scope.row)">编辑</el-button>
					<el-button
						v-if="scope.row.is_admin != 1"
						size="small"
						type="danger"
						@click="handleDelete(scope.row)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="listData.total"
			@paginationData="paginationData"
		></Pagination>
	</el-card>
</template>

<script>
import router from "@/router/index.js";
import store from "@/store/index.js";
import Pagination from "@/components/Pagination.vue";
export default {
	components: {
		Pagination,
	},
	data() {
		return {
			loading: false,
			listData: {
				total: 0,
				data: [],
			}, // 数据列表
			search: {
				page: 1,
				page_size: 10,
				keywords: "",
			},
		};
	},
	created() {
		store.getMenuListAction();
		this.getList();
	},
	methods: {
		paginationData(val) {
			this.search.page = val.page;
			this.search.page_size = val.page_size;
			this.getList();
		},
		async getList() {
			this.loading = true;
			const { data: response } = await this.$http.get("/set/admin/page_list", {
				params: this.search,
			});
			this.loading = false;
			if (response.code == 0) {
				this.listData = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		goAdd() {
			router.push({
				path: "/set/admin/push",
			});
		},
		goEdit(row) {
			router.push({
				path: "/set/admin/push",
				query: {
					id: row.id,
				},
			});
		},
		async handleDelete(row) {
			let confirmRes = await this.$confirm("删除次条目，是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "error",
			}).catch((err) => console.log(err, "err"));
			if (confirmRes != "confirm") {
				return;
			}
			const { data: response } = await this.$http.post("/set/admin/delete", {
				id: row.id,
			});
			if (response.code == 0) {
				this.getList();
				this.$notify.success("删除成功!");
			} else {
				this.$notify.error(response.message);
			}
		},
	},
};
</script>
