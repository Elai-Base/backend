<template>
  <el-card>
    <div class="search">
      <el-row>
        <el-col :span="6">
          <el-input
            v-model="search.keywords"
            placeholder="请输入行为/操作地址/IP进行搜索"
          ></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="search-row">
            <div class="search-label">操作者</div>
            <el-select
              v-model="search.admin_id"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in adminList"
                :key="item.id"
                :label="item.name + '(' + item.id + ')'"
                :value="item.id"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" @click="getList()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="listData.data"
      row-key="id"
      border
      :default-sort="{ prop: 'created_at', order: 'descending' }"
      @sort-change="sortList"
      v-loading="loading"
    >
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column label="操作者" width="100">
        <template #default="scope">
          {{ scope.row.admin_info.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="行为"></el-table-column>
      <el-table-column prop="url" label="操作地址"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="data" label="操作数据"></el-table-column>
      Î
      <el-table-column
        prop="created_at"
        label="操作时间"
        width="240"
        sortable="custom"
      ></el-table-column>
    </el-table>
    <Pagination
      :total="listData.total"
      @paginationData="paginationData"
    ></Pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      adminList: [],
      loading: false,
      listData: {
        total: 0,
        data: [],
      }, // 数据列表
      search: {
        page: 1,
        page_size: 10,
        keywords: "",
        sort_field: "id",
        sort_order: "desc",
        admin_id: "",
      },
    };
  },
  created() {
    this.getList();
    this.getAdminList();
  },
  methods: {
    paginationData(val) {
      this.search.page = val.page;
      this.search.page_size = val.page_size;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const { data: response } = await this.$http.get("/set/log/page_list", {
        params: this.search,
      });
      this.loading = false;
      if (response.code == 0) {
        this.listData = response.data;
      } else {
        this.$notify.error(response.message);
      }
    },
    async getAdminList() {
      const { data: response } = await this.$http.get("/set/log/admin_list");

      this.loading = false;
      if (response.code == 0) {
        this.adminList = response.data;
      } else {
        this.$notify.error(response.message);
      }
    },
    sortList(column) {
      this.search.sort_field = column.prop;
      if (column.order == "ascending") {
        this.search.sort_order = "asc";
      } else {
        this.search.sort_order = "desc";
      }
      this.getList();
    },
  },
};
</script>
