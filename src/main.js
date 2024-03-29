import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store/index'

// 配置Mock
// mock开关
const mock = false
if (mock) {
	require('./mock/api.js')
}

// 响应配置信息
// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
// 响应超时限制
axios.defaults.timeout = 8000

// 拦截器，对相应给出的错误进行拦截
axios.interceptors.response.use(
	// 业务状态码拦截
	function(response) {
		// 获取接口返回的全部的值
		let res = response.data
		// 获取hash路由
		let path = location.hash
		// 状态码为0代表成功
		if (res.status == 0) {
			// 返回响应成功时的值
			return res.data
		} // 状态码为10代表未登录
		else if (res.status == 10) {
			// 如果不是在首页
			if (path != '#/index' && path != '#/product/30') {
				// 跳转到登录页面
				window.location.href = '/#/login'
				// 抛出异常
				return Promise.reject(res)
			}
		} else {
			Message.warning(res.msg)
			// 抛出异常
			return Promise.reject(res)
		}
	},
	// http状态码拦截
	(error) => {
		let res = error.response
		Message.error(res.data.message)
		return Promise.reject(error)
	}
)

// 使用vue-axios将作用域挂载到Vue实例上，从而实现直接this.axios方便使用
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
	loading: '/imgs/loading-svg/loading-bars.svg',
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app')
