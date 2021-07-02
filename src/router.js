import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

Vue.use(Router)

export default new Router({
	// 配置路由
	routes: [
		// home父路由
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: 'index',
			children: [
				// 首页路由
				{
					path: '/index',
					name: 'index',
					component: Index,
				},
				// 商品站路由
				{
					path: '/product/:id',
					name: 'product',
					component: () => import('./pages/product.vue'),
				},
				// 商品详情路由
				{
					path: '/detail/:id',
					name: 'detail',
					component: () => import('./pages/detail.vue'),
				},
			],
		},
		// 购物车路由
		{
			path: '/cart',
			name: 'cart',
			component: () => import('./pages/cart.vue'),
		},
		// 订单路由
		{
			path: '/order',
			name: 'order',
			component: () => import('./pages/order.vue'),
			children: [
				// 订单确认路由
				{
					path: 'confirm',
					name: 'order-confirm',
					component: () => import('./pages/orderConfirm.vue'),
				},
				// 订单列表路由
				{
					path: 'list',
					name: 'order-list',
					component: () => import('./pages/orderList.vue'),
				},
				// 订单支付路由
				{
					path: 'pay',
					name: 'order-pay',
					component: () => import('./pages/orderPay.vue'),
				},
				// 支付中转页面
				{
					path: 'alipay',
					name: 'ali-pay',
					component: () => import('./pages/alipay.vue'),
				},
			],
		},
		// 登录路由
		{
			path: '/login',
			name: 'login',
			component: () => import('./pages/login.vue'),
		},
		// 注册路由
		{
			path: '/register',
			name: 'register',
			component: () => import('./pages/register.vue'),
		},
	],
})
