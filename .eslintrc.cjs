module.exports = {
    //运行环境
    env: {
        browser: true, //浏览器
        es2021: true, //es2021
    },
    //规则继承
    extends: [
        //全部规则默认是关闭的，这个配置项开启推荐规则，详细参考广泛文档。例如：函数不能重名，对象不能出现重复key
        'eslint:recommended',
        //ts语法规则
        'plugin:@typescript-eslint/recommended',
        //vue3语法规则
        'plugin:vue/vue3-essential',
        //使用prettier格式化
        'prettier',
    ],
    //为特定类型的文件指定处理器
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser', //ts解析器
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    /**
     * 限制规则
     * off 或者 0 => 关闭规则
     * warn 或者 1 => 打开的规则作为警告（不影响代码执行）
     * error 或者 2 => 规则作为一个错误（代码不能执行，界面错误）
     */
    rules: {
        'prettier/prettier': 'error', // 开启规则
        //eslint 参考配置：@see(https://eslint.org/docs/latest/rules/)
        'no-var': 'error', //要求使用let or const 不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], //不允许使用多个空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', //禁止多余的空行
        'no-useless-escape': 'off', //禁止不需要的转义字符

        //typescript 参考配置：@see(https://typescript-eslint.io/rules/)
        '@typescript-eslint/no-unused-vars': 'error', //禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', //禁止使用ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', //禁止使用any类型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', //禁止使用自定义TypeScript模块
        '@typescript-eslint/semi': 'off',

        //eslint-plugin-vue @see(https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', //要求组件名称始终为"-"链接的单词
        'vue/script-setup-uses-vars': 'error', //防止<script setup>使用的变量<template></template>
        'vue/no-mutating-props': 'off', //不允许组件prop的改变
        'vue/attribute-hyphenation': 'off', //对模板中的自定义组件强制执行属性命名样
    },
};
