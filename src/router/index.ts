import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './menu';

const router = createRouter({
	history: createWebHashHistory(),
	//@ts-ignore
	routes: routes,
});

export default router;
