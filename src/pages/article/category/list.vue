<template>
  <el-card>
    <div class="search">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="goPush(null)">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="categoryStore.treeList"
      row-key="id"
      :border="true"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      v-loading="categoryStore.loading"
    >
      <el-table-column prop="name" label="分类名称"></el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="goPush(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import useCategoryStore from "@/store/article/category";
const categoryStore = useCategoryStore();
categoryStore.getTreeList();

import router from "@/router";

function goPush(row: any) {
  router.push({
    path: "/article/category/push",
    query: {
      id: row ? row.id : 0,
    },
  });
}

function del(row: any = null) {
  categoryStore.del(row.id);
}
</script>
