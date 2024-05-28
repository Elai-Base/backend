<template>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :page-sizes="[10, 30, 50, 100]"
    :page-size="pagination.page_size"
    @size-change="pageSizeChange"
    @current-change="pageChange"
  ></el-pagination>
</template>
<script>
export default {
  props: ["total"],
  data() {
    return {
      pagination: {
        page: 1,
        page_size: 10,
      },
    };
  },
  methods: {
    pageSizeChange(e) {
      this.pagination.page_size = e;
      this.$emit("paginationData", this.pagination);
    },
    pageChange(e) {
      this.pagination.page = e;
      this.$emit("paginationData", this.pagination);
    },
  },
};
</script>
<style scoped>
.el-pagination {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
