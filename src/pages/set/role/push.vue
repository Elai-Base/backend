<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>编辑</span>
			</div>
			<div class="card-header-action">
				<el-button @click="goBack()">返回</el-button>
			</div>
		</template>
		<el-form label-width="120px" v-loading="loading">
			<el-form-item label="角色名称" class="required">
				<el-input
					class="el-col-12"
					v-model="form.name"
					placeholder="请输入角色名称"
				></el-input>
			</el-form-item>

			<el-form-item label="权限菜单" class="required">
				<el-tree
					:data="treeList"
					show-checkbox
					node-key="id"
					default-expand-all
					:props="defaultProps"
					ref="tree"
					:default-checked-keys="defaultKey"
				>
				</el-tree>
			</el-form-item>

			<el-form-item>
				<el-button @click="goBack()">返回</el-button>
				<el-button type="primary" @click="onSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import router from "@/router/index.js";
import tools from "@/utils/tools.js";
export default {
	data() {
		return {
			loading: false,
			treeList: [],
			defaultProps: {
				expandTrigger: "hover",
				value: "id",
				label: "name",
			},
			defaultKey: [],
			id: "",
			form: {
				id: "",
				name: "",
				permission: "",
			},
		};
	},
	created() {
		this.getTreeList();
		this.id = tools.getQueryString("id");
		if (this.id) {
			this.getInfo();
		}
	},
	methods: {
		goBack() {
			router.go(-1);
		},
		async getTreeList() {
			const { data: response } = await this.$http.get(
				"/set/role/permission_tree"
			);
			if (response.code == 0) {
				this.treeList = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		async getInfo() {
			this.loading = true;
			const { data: response } = await this.$http.get("/set/role/info", {
				params: {
					id: this.id,
				},
			});

			this.loading = false;
			if (response.code == 0) {
				let info = response.data;
				this.form = info;
				this.defaultKey = info.permission;
			} else {
				this.$notify.error(response.message);
			}
		},
		async onSubmit() {
			this.form.permission = this.$refs.tree.getCheckedKeys();
			const { data: response } = await this.$http.post(
				"/set/role/push",
				this.form
			);

			if (response.code == 0) {
				this.$notify.success("操作成功");
				router.go(-1);
			} else {
				this.$notify.error(response.message);
			}
		},
	},
};
</script>