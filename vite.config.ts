// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            port: 5000,
        },
        build: {
            outDir: env.VITE_OUTPUT_DIR,
        },
        resolve: {
            alias: {
                '@': path.resolve('src'), //配置src的别名
            },
        },
        plugins: [vue()],
    };
});
