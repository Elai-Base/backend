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
			<el-form-item label="关联菜单" class="required">
				<el-cascader
					class="el-col-12"
					v-model="form.menu"
					clearable
					filterable
					placeholder="请选择"
					:options="menuList"
					:props="cascaderConfig"
				>
				</el-cascader>
			</el-form-item>
			<el-form-item label="接口地址" class="required">
				<el-input
					class="el-col-12"
					type="textarea"
					:rows="5"
					v-model="form.url"
					placeholder="请输入接口地址"
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
			menuList: [],
			cascaderConfig: {
				expandTrigger: "hover",
				value: "id",
				label: "name",
			},
			id: "",
			form: {
				menu: "",
				url: "",
			},
		};
	},
	created() {
		this.getMenuList();
		this.id = tools.getQueryString("id");
		if (this.id) {
			this.getInfo();
		}
	},
	methods: {
		goBack() {
			router.go(-1);
		},
		async getMenuList() {
			const { data: response } = await this.$http.get("/set/menu/all_list");
			if (response.code == 0) {
				this.menuList = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		async getInfo() {
			this.loading = true;
			const { data: response } = await this.$http.get("/set/permission/info", {
				params: {
					id: this.id,
				},
			});

			this.loading = false;
			if (response.code == 0) {
				this.form = response.data;
			} else {
				this.$notify.error(response.message);
			}
		},
		async onSubmit() {
			const { data: response } = await this.$http.post(
				"/set/permission/push",
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