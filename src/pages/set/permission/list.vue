<template>
	<el-card>
		<div class="search">
			<el-row>
				<el-col :span="2" :offset="22">
					<el-button size="small" type="primary" @click="goAdd()">
						添加
					</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table
			:data="tableData"
			row-key="id"
			border
			default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			v-loading="loading"
		>
			<el-table-column prop="name" label="关联菜单"></el-table-column>
			<el-table-column label="接口地址">
				<template #default="scope">
					<span v-html="urlFilter(scope.row.permission.url)"></span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="180">
				<template #default="scope">
					<el-row v-if="scope.row.permission.id">
						<el-button size="small" @click="goEdit(scope.row.permission)">
							编辑
						</el-button>
						<el-button
							size="small"
							type="danger"
							@click="handleDelete(scope.row.permission)"
						>
							删除
						</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
import router from "@/router/index.js";
export default {
	data() {
		return {
			tableData: [], // 数据列表
			loading: false,
		};
	},
	created() {
		this.getList();
	},
	methods: {
		async getList() {
			this.loading = true;
			const { data: response } = await this.$http.get(
				"/set/permission/all_list"
			);
			this.loading = false;
			if (response.code == 0) {
				this.tableData = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		urlFilter(url) {
			//替换所有的换行符
			if (url) {
				url = url.replace(/\r\n/g, "<br>");
				url = url.replace(/\n/g, "<br>");
			}
			return url;
		},
		goAdd() {
			router.push({
				path: "/set/permission/push",
			});
		},
		goEdit(row) {
			router.push({
				path: "/set/permission/push",
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
			const { data: response } = await this.$http.post(
				"/set/permission/delete",
				{
					id: row.id,
				}
			);
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
