<template>
	<el-dialog
		v-model="config.show"
		:title="config.title"
		width="540"
		@close="closeDialog"
	>
		<div class="list">
			<el-radio-group
				v-model="themeSelect"
				@change="changeRadio"
			>
				<div
					class="item"
					v-for="item in theme"
				>
					<div
						class="color"
						:style="'background:' + item.color"
					></div>
					<div class="name">
						<el-radio :value="item.value">{{ item.name }}</el-radio>
					</div>
				</div>
			</el-radio-group>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import storage from '@/utils/storage';
import { ref } from 'vue';

const props = defineProps({
	config: {
		type: Object,
		default: () => ({
			theme: 'default',
			show: false,
			title: '切换主题',
		}),
	},
});

const emit = defineEmits(['update:config']);

const closeDialog = () => {
	const newConfig = { ...props.config };
	newConfig.show = false;
	emit('update:config', newConfig);
};

const themeSelect = ref('');
themeSelect.value = storage.get('theme');

const changeRadio = (val: any) => {
	const newConfig = { ...props.config };
	newConfig.theme = val;
	emit('update:config', newConfig);
};

const theme = [
	{
		name: '白色主题',
		color: '#fffff',
		value: 'default',
	},
	{
		name: '蓝色主题',
		color: 'blue',
		value: 'blue',
	},
	{
		name: '绿色主题',
		color: 'green',
		value: 'green',
	},
	{
		name: '紫色主题',
		color: 'purple',
		value: 'purple',
	},
	{
		name: '黑色主题',
		color: 'black',
		value: 'dark',
	},
];
</script>
<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;

	.item {
		text-align: center;
		margin-right: 10px;
		margin-bottom: 10px;
		.color {
			border: 1px solid #eeeeee;
			width: 90px;
			height: 60px;
		}
		.label {
			font-size: 14px;
		}
	}
}
</style>
