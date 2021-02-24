import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index.vue'
import Product from './pages/product.vue'
import Detail from './pages/detail.vue'
import Cart from './pages/cart.vue'
import Order from './pages/order.vue'
import OrderConfirm from './pages/orderConfirm.vue'
import OrderList from './pages/orderList.vue'
import OrderPay from './pages/orderPay.vue'
import AliPay from './pages/alipay.vue'
import Login from './pages/login.vue'

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
					component: Product,
				},
				// 商品详情路由
				{
					path: '/detail/:id',
					name: 'detail',
					component: Detail,
				},
			],
		},
		// 购物车路由
		{
			path: '/cart',
			name: 'cart',
			component: Cart,
		},
		// 订单路由
		{
			path: '/order',
			name: 'order',
			component: Order,
			children: [
				// 订单确认路由
				{
					path: 'confirm',
					name: 'order-confirm',
					component: OrderConfirm,
				},
				// 订单列表路由
				{
					path: 'list',
					name: 'order-list',
					component: OrderList,
				},
				// 订单支付路由
				{
					path: 'pay',
					name: 'order-pay',
					component: OrderPay,
				},
				// 支付中转页面
				{
					path: 'alipay',
					name: 'ali-pay',
					component: AliPay,
				},
			],
		},
		// 登录路由
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
	],
})
