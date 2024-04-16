<template>
	<el-card>
		<template #header>
			<span>编辑</span>
			<el-button @click="router.go(-1)">返回</el-button>
		</template>
		<el-form label-width="120px" v-loading="menuStore.loading">
			<el-form-item label="父级菜单">
				<el-select class="el-col-12" v-model="form.parent_id" clearable filterable placeholder="请选择">
					<el-option v-for="item in menuStore.treeList" :key="item.id" :label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="菜单名称" class="required">
				<el-input class="el-col-12" v-model="form.name" placeholder="请输入菜单名称"></el-input>
			</el-form-item>
			<el-form-item label="菜单地址">
				<el-input class="el-col-12" v-model="form.uri" placeholder="请输入菜单地址"></el-input>
			</el-form-item>
			<el-form-item label="ICON">
				<el-input class="el-col-12" v-model="form.icon" placeholder="请输入iconfont的class名称,参考iconfont"></el-input>
			</el-form-item>
			<el-form-item label="权重">
				<el-input class="el-col-12" v-model="form.weight" placeholder="请输入权重，越大越靠前" type="number"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="router.go(-1)">返回</el-button>
				<el-button type="primary" @click="adminMenuStore.update(form)">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import router from "@/router";
import useMenuStore from '@/store/set/menu';
const menuStore = useMenuStore();
const form = ref({
	id: 0,
	parent_id: 0,
	name: '',
	uri: '',
	icon: '',
	weight: 0,
})

onMounted(async () => {
	const route = useRouter()
	const query = route.currentRoute.value.query
	if (query.id > 0) {
		await menuStore.getInfo(query.id)
		form.value = menuStore.info
	}
})

</script>
