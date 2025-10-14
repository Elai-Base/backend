import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './menu';

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
	//滚动行为
	scrollBehavior() {
		return {
			left: 0,
			top: 0,
		};
	},
});

export default router;
