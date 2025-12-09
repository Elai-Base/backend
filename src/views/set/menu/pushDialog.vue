<template>
	<el-dialog
		v-model="menuStore.showDialog"
		:title="config.title"
		@close="menuStore.showDialog = false"
		width="600px"
	>
		<el-form
			label-width="120px"
			v-loading="menuStore.loading"
		>
			<el-form-item label="父级菜单">
				<el-select
					class="el-col-18"
					v-model="form.parent_id"
					clearable
					filterable
					placeholder="请选择"
				>
					<el-option
						label="一级菜单"
						:value="0"
					></el-option>
					<el-option
						v-for="item in menuStore.tree"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="菜单名称"
				class="required"
			>
				<el-input
					class="el-col-18"
					v-model="form.name"
					placeholder="请输入菜单名称"
				></el-input>
			</el-form-item>
			<el-form-item label="菜单地址">
				<el-input
					class="el-col-18"
					v-model="form.uri"
					placeholder="请输入菜单地址"
				></el-input>
			</el-form-item>
			<el-form-item label="iconfont图标">
				<el-input
					class="el-col-18"
					v-model="form.icon"
					placeholder="请输入iconfont的class名称,参考iconfont"
				></el-input>
			</el-form-item>
			<el-form-item label="图标大小">
				<el-input
					class="el-col-18"
					v-model="form.icon_size"
					placeholder="请输入iconfont的字体大小,单位px"
				></el-input>
			</el-form-item>
			<el-form-item label="权重">
				<el-input
					class="el-col-18"
					v-model="form.weight"
					placeholder="请输入权重，越大越靠前"
					type="number"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="menuStore.showDialog = false">返回</el-button>
				<el-button
					type="primary"
					@click="update()"
				>
					提交
				</el-button>
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
			title: '编辑',
			id: 0,
		}),
	},
});
import useMenuStore from '@/stores/set/menu';
import { MenuForm } from '@/types/set/menu';
const menuStore = useMenuStore();
const form = ref<MenuForm>({
	id: 0,
	parent_id: 0,
	name: '',
	uri: '',
	icon: '',
	icon_size: '16px',
	weight: 0,
});

watch(
	() => menuStore.showDialog,
	async (newVal) => {
		if (newVal) {
			// 弹窗打开时，刷新菜单树
			form.value.id = props.config.id;
			form.value.parent_id = 0;
			form.value.name = '';
			form.value.uri = '';
			form.value.icon = '';
			form.value.icon_size = '16px';
			form.value.weight = 0;
			if (props.config.id > 0) {
				await menuStore.infoFunc(props.config.id);
				form.value = menuStore.info;
			}
			menuStore.treeFunc();
		}
	},
);

function update() {
	if (form.value.id && form.value.id > 0) {
		form.value.weight = Number(form.value.weight);
		menuStore.updateFunc(form.value);
	} else {
		menuStore.createFunc(form.value);
	}
}
</script>
