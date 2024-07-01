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
<script setup lang="ts">
import { ref } from 'vue';
defineProps({
    total: {
        type: Number,
        default: 0,
    },
});
let $emit = defineEmits(['paginationData']);
const pagination = ref({
    page: 1,
    page_size: 10,
});

function pageSizeChange(e: number) {
    pagination.value.page_size = e;
    $emit('paginationData', pagination.value);
}
function pageChange(e: number) {
    pagination.value.page = e;
    $emit('paginationData', pagination.value);
}
</script>
<style lang="scss" scoped>
.el-pagination {
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
}
</style>
