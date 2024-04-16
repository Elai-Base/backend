<template>
	<el-card>
		<div class="search">
			<el-row>
				<el-col :span="2" :offset="22">
					<el-button size="small" type="primary" @click="goPush()">
						添加
					</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table :data="permissionStore.list" row-key="id" :border="true" default-expand-all
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-loading="permissionStore.loading">
			<el-table-column prop="name" label="关联菜单"></el-table-column>
			<el-table-column label="接口地址">
				<template #default="scope">
					<span v-html="urlFilter(scope.row.permission.uri)"></span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="180">
				<template #default="scope">
					<el-row v-if="scope.row.permission.id">
						<el-button size="small" @click="goPush(scope.row.permission)">
							编辑
						</el-button>
						<el-button size="small" type="danger" @click="permissionStore.del(scope.row.permission.id)">
							删除
						</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import router from '@/router'
import usePermissionStore from '@/store/set/permission';
const permissionStore = usePermissionStore();

onMounted(async () => {
	await permissionStore.getTreeList()
})

function goPush(row: any) {
	router.push({
		path: '/set/permission/push',
		query: {
			id: row ? row.id : 0
		}
	})
}

function urlFilter(url) {
	//替换所有的换行符
	if (url) {
		url = url.replace(/\r\n/g, "<br>");
		url = url.replace(/\n/g, "<br>");
	}
	return url;
}
</script>
