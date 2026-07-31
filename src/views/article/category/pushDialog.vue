<template>
	<el-dialog
		v-model="categoryStore.showDialog"
		:title="config.title"
		@close="categoryStore.showDialog = false"
		width="600px"
	>
		<el-form
			label-width="120px"
			v-loading="categoryStore.loading"
		>
			<el-form-item label="父级">
				<el-select
					class="el-col-12"
					v-model="form.parent_id"
					clearable
					filterable
					placeholder="请选择"
				>
					<el-option
						v-for="item in categoryStore.treeList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="分类名称"
				class="required"
			>
				<el-input
					class="el-col-12"
					v-model="form.name"
					placeholder="请输入分类名称"
				></el-input>
			</el-form-item>
			<el-form-item label="权重">
				<el-input
					class="el-col-12"
					v-model="form.weight"
					placeholder="请输入权重，越大越靠前"
					type="number"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="categoryStore.showDialog = false">返回</el-button>
				<el-button
					type="primary"
					@click="update()"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
	config: {
		type: Object,
		default: () => ({
			title: '新增',
			id: 0,
		}),
	},
});

import { useRouter } from 'vue-router';
import router from '@/router';
import useArticleCategoryStore from '@/stores/article/category';
const categoryStore = useArticleCategoryStore();

const form = ref(<CategoryForm>{
	id: 0,
	parent_id: 0,
	name: '',
	uri: '',
	icon: '',
	weight: 0,
});

watch(
	() => categoryStore.showDialog,
	async (newVal) => {
		if (newVal) {
			// 弹窗打开时，刷新菜单树
			form.value.name = '';
			form.value.id = props.config.id;
			if (props.config.id > 0) {
				await categoryStore.infoFunc(props.config.id);
				form.value = categoryStore.info;
			}
		}
	},
);

function update() {
	if (form.value.id && form.value.id > 0) {
		form.value.weight = Number(form.value.weight);
		categoryStore.updateFunc(form.value);
	} else {
		categoryStore.createFunc(form.value);
	}
}
</script>
