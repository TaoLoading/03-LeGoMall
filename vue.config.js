module.exports = {
	devServer: {
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://mall-pre.springboot.cn',
				changeOrigin: true,
				pathRewrite: {
					'/api': '',
				},
			},
		},
		// 关闭ESLint
		// lintOnSave: false,
	},
	// 保证路由按需加载
	chainWebpack: (config) => {
		config.plugins.delete('prefetch')
	},
}
