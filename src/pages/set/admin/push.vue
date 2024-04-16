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
		<el-form label-width="120px" v-loading="adminStore.loading">
			<el-form-item label="角色" class="required">
				<el-select class="el-col-12" v-model="form.role_id" placeholder="请选择"
					:disabled="form.is_admin > 0 ? true : false">
					<el-option v-for="(item, index) in roleStore.allList" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="账号" class="required">
				<el-input class="el-col-12" v-model="form.name" placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item label="密码" class="required">
				<el-input class="el-col-12" v-model="form.password" placeholder="请输入密码" type="password"></el-input>
			</el-form-item>

			<el-form-item label="手机号" class="required">
				<el-input class="el-col-12" v-model="form.phone" placeholder="请输入手机号" type="number"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="router.go(-1)">返回</el-button>
				<el-button type="primary" @click="adminStore.update(form)">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import router from '@/router'
import { useRouter } from "vue-router"
import useAdminStore from '@/store/set/admin';
const adminStore = useAdminStore();

import useRoleStore from '@/store/set/role';
const roleStore = useRoleStore();
const form = ref({
	id: 0,
	role_id: 1,
	name: "",
	phone: "",
})
onMounted(async () => {
	const route = useRouter()
	const query = route.currentRoute.value.query
	if (query.id > 0) {
		await adminStore.getInfo(query.id)
		form.value = adminStore.info
	}
	await roleStore.getAllList()
})
</script>

<style lang="scss">
.manager-department {
	.el-tree-node.is-expanded>.el-tree-node__children {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.el-tree-node__children>div {
		width: 20%;
	}
}
</style>