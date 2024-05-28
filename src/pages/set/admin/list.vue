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
      :data="adminStore.list"
      row-key="id"
      :border="true"
      v-loading="adminStore.loading"
    >
      <el-table-column label="账号名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="用户电话">
        <template #default="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          {{ scope.row.role_info.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="goPush(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.is_admin != 1"
            size="small"
            type="danger"
            @click="adminStore.del(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="adminStore.total"
      @paginationData="paginationData"
    ></Pagination>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import router from "@/router";
import useAdminStore from "@/store/set/admin";
const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.getPageList();
});

function paginationData(val) {
  adminStore.search.page = val.page;
  adminStore.search.page_size = val.page_size;
  adminStore.getPageList();
}

function goPush(row: any) {
  router.push({
    path: "/set/admin/push",
    query: {
      id: row ? row.id : 0,
    },
  });
}
</script>
