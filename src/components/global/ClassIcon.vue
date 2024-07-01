<template>
    <span
        class="iconfont"
        :class="prefix + name"
        :style="{ color: color, fontSize: fontSize }"
    ></span>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: 'icon-',
    },
    name: String,
    color: {
        type: String,
        default: '',
    },
    fontSize: {
        type: String,
        default: '16px',
    },
});
</script>

<style scoped></style>
