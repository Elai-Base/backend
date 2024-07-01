<template>
    <el-card>
        <div class="search">
            <el-row>
                <el-col :span="2" :offset="22">
                    <el-button type="primary" @click="goPush()">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
            :data="menuStore.treeList"
            row-key="id"
            :border="true"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            v-loading="menuStore.loading"
        >
            <el-table-column prop="name" label="菜单名称"></el-table-column>
            <el-table-column prop="uri" label="地址"></el-table-column>
            <el-table-column prop="weight" label="权重"></el-table-column>
            <el-table-column label="图标">
                <template #default="scope">
                    <span v-if="scope.row.icon" class="iconfont" :class="scope.row.icon"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" @click="goPush(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts" setup>
import useMenuStore from '@/store/set/menu';
const menuStore = useMenuStore();
menuStore.getTreeList();

import router from '@/router';

function goPush(row: any) {
    router.push({
        path: '/set/menu/push',
        query: {
            id: row ? row.id : 0,
        },
    });
}

function del(row: any = null) {
    menuStore.del(row.id);
}
</script>
