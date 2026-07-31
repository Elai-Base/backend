<template>
	<el-card>
		<div class="search">
			<div class="condition">
				<div class="group">
					<el-input
						v-model="roleStore.search.keyword"
						placeholder="请输入角色名称进行搜索"
						style="min-width: 240px"
					></el-input>
				</div>
			</div>
			<div class="operation">
				<el-button
					type="success"
					@click="search()"
				>
					搜索
				</el-button>
				<el-button
					type="primary"
					@click="showAdd()"
				>
					添加
				</el-button>
			</div>
		</div>
	</el-card>
	<el-card class="mt10">
		<el-table
			:data="roleStore.pageData.list"
			row-key="id"
			:border="true"
			v-loading="roleStore.loading"
		>
			<el-table-column
				prop="id"
				label="ID"
				width="60"
			></el-table-column>
			<el-table-column
				prop="name"
				label="角色名称"
			></el-table-column>
			<el-table-column
				width="100"
				label="启用/禁用"
			>
				<template #default="scope">
					<el-switch
						v-if="scope.row.id > 1"
						v-model="scope.row.is_hid"
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
						:active-value="0"
						:inactive-value="1"
						@change="able(scope.row)"
					/>
				</template>
			</el-table-column>
			<el-table-column
				width="200"
				prop="created_at"
				label="创建时间"
			></el-table-column>

			<el-table-column
				label="操作"
				width="180"
			>
				<template #default="scope">
					<el-button
						size="small"
						@click="showEdit(scope.row.id)"
					>
						编辑
					</el-button>
					<el-button
						v-if="scope.row.id > 1"
						size="small"
						type="danger"
						@click="roleStore.deleteFunc(scope.row.id)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="roleStore.pageData.total"
			@paginationData="paginationData"
		></Pagination>
	</el-card>
	<PushDialog v-model:config="pushConfig"></PushDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RoleAbleForm } from '@/types/set/role';
import PushDialog from '@/views/set/role/pushDialog.vue';
import useRoleStore from '@/stores/set/role';
const roleStore = useRoleStore();

onMounted(async () => {
	await roleStore.pageFunc();
});

const able = (row: any) => {
	const form = ref<RoleAbleForm>({
		ids: [row.id],
		is_hid: row.is_hid,
	});
	roleStore.ableFunc(form.value);
};

const search = () => {
	roleStore.search.current_page = 1;
	roleStore.pageFunc();
};

const paginationData = (val: any) => {
	roleStore.search.current_page = val.page;
	roleStore.search.page_size = val.page_size;
	roleStore.pageFunc();
};

const pushConfig = ref({
	title: '',
	id: 0,
});
const showAdd = () => {
	roleStore.showDialog = true;
	pushConfig.value.title = '新增';
	pushConfig.value.id = 0;
};
const showEdit = (id: number) => {
	roleStore.showDialog = true;
	pushConfig.value.title = '编辑';
	pushConfig.value.id = id;
};
</script>
