module.exports = {
    root: true,
    // 环境：指定代码运行的环境，每个环境会预设一组全局变量
    env: {
        browser: true, // 浏览器环境
        es2021: true, // ES2021 特性
        node: true, // Node.js 环境
    },
    // 解析器设置
    parser: 'vue-eslint-parser',
    // 解析器选项
    parserOptions: {
        parser: '@typescript-eslint/parser', // 解析TypeScript
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    // 继承的规则集
    extends: [
        'eslint:recommended', // ESLint 官方推荐规则
        'plugin:vue/vue3-recommended', // Vue3 官方推荐规则
        'plugin:@typescript-eslint/recommended', // TypeScript 官方推荐规则
        'plugin:prettier/recommended', // 整合Prettier
        'prettier', // 关闭与Prettier冲突的ESLint规则
    ],
    // 插件
    plugins: ['vue', '@typescript-eslint', 'prettier', 'import'],

    settings: {
        'import/resolver': {
            typescript: {}, // 支持TypeScript的import解析
        },
    },

    /**
     * 限制规则
     * off 或者 0 => 关闭规则
     * warn 或者 1 => 打开的规则作为警告（不影响代码执行）
     * error 或者 2 => 规则作为一个错误（代码不能执行，界面错误）
     */
    rules: {
        // 基础规则 参考配置：@see(https://eslint.org/docs/latest/rules/)
        'prettier/prettier': 'error', // 开启规则
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止使用console
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止使用debugger
        'no-var': 'error', //要求使用let or const 不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], //不允许使用多个空行
        'no-unexpected-multiline': 'error', //不允许 多余的空行
        'no-useless-escape': 'off', //不允许 不需要的转义字符

        // Vue规则 参考配置：@see(https://eslint.vuejs.org/rules/)
        'vue/script-setup-uses-vars': 'error', // 确保script-setup中声明的变量被使用
        'vue/no-mutating-props': 'error', // 禁止修改props
        'vue/no-unused-components': 'warn', // 未使用的组件警告
        'vue/attribute-hyphenation': ['error', 'always'], // 属性使用连字符命名
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],

        // TypeScript规则 参考配置：@see(https://typescript-eslint.io/rules/)
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ], //不允许 定义未使用的变量
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭显式导出类型检查
        '@typescript-eslint/no-explicit-any': 'off', // any类型警告
        '@typescript-eslint/ban-ts-comment': 'warn', // 禁止使用@ts-ignore等注释

        // Prettier规则（通过eslint-plugin-prettier关联）
        'prettier/prettier': 'error',

        // import规则
        'import/order': [
            'warn',
            {
                groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
            },
        ],
    },
};
