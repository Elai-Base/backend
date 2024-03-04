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
			<el-form-item label="角色" class="required">
				<el-select
					class="el-col-12"
					v-model="form.role_id"
					placeholder="请选择"
					:disabled="form.is_admin > 0 ? true : false"
				>
					<el-option
						v-for="(item, index) in roleList"
						:key="index"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="账号" class="required">
				<el-input
					class="el-col-12"
					v-model="form.name"
					placeholder="请输入账号"
				></el-input>
			</el-form-item>
			<el-form-item label="密码" class="required">
				<el-input
					class="el-col-12"
					v-model="form.password"
					placeholder="请输入密码"
					type="password"
				></el-input>
			</el-form-item>

			<el-form-item label="手机号" class="required">
				<el-input
					class="el-col-12"
					v-model="form.phone"
					placeholder="请输入手机号"
					type="number"
				></el-input>
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
			roleList: [],

			defaultProps: {
				expandTrigger: "hover",
				value: "id",
				label: "name",
			},
			defaultKey: [],
			id: "",
			form: {
				id: "",
				role_id: "",
				name: "",
				phone: "",
			},
		};
	},
	created() {
		this.getRoleList();
		this.id = tools.getQueryString("id");
		if (this.id) {
			this.getInfo();
		}
	},
	methods: {
		goBack() {
			router.go(-1);
		},

		async getRoleList() {
			this.loading = true;
			const { data: response } = await this.$http.get("/set/admin/role_list");

			this.loading = false;
			if (response.code == 0) {
				this.roleList = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		async getInfo() {
			this.loading = true;
			const { data: response } = await this.$http.get("/set/admin/info", {
				params: { id: this.id },
			});
			this.loading = false;
			if (response.code == 0) {
				let info = response.data;
				this.form = info;
				this.defaultKey = info.department;
			} else {
				this.$notify.error(response.message);
			}
		},
		async onSubmit() {
			const { data: response } = await this.$http.post(
				"/set/admin/push",
				this.form
			);
			if (response.code == 0) {
				this.$message.success("操作成功！");
				router.go(-1);
			} else {
				this.$notify.error(response.message);
			}
		},
	},
};
</script>

<style lang="scss" >
.manager-department {
	.el-tree-node.is-expanded > .el-tree-node__children {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.el-tree-node__children > div {
		width: 20%;
	}
}
</style>