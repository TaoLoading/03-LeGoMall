# mall

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目进程

## Day01 内容

### 01.建立项目框架

1. 全局安装VueCli后，输入命令 "vue create 项目名" 以创建项目框架
2. 根据提示分别输入命令 "cd 项目名" 和 "yarn serve" 运行项目，后续运行项目时只需输入 "yarn sserve"
3. VueCli3.0增加了一个可视化项目管理工具，即Vue UI。运行命令为 "vue ui" ，打开后导入创建的项目
4. 熟悉Vue UI操作，并在项目依赖中安装所需依赖，如axios、vue-router等

### 02.跨域解决案

1. CORS跨域
2. JSONP跨域
3. 代理跨域(本项目采用)

### 03.按照模块化和组件化的思想初步整理项目结构

1. api文件夹用于存放接口文档
2. util文件夹用于存在共用机制，如金额格式化、文字转换等
3. storage文件用于数据存储，存放localstorage、sessionstorage等
4. store文件夹用于vuex的使用
5. pages文件用于存放页面代码，其中使用组件化的思想对页面进行拆分和重组
6. router.js文件用于存放路由

## Day02 内容

### 01.封装路由

1. 根据设计稿对页面进行拆分，根据页面组件的可复用性明确页面组件之间的嵌套关系，在配置路由时要遵循这一嵌套关系
    * 如首页、商品栈和商品详情共用一个父路由，订单下的订单确认、订单列表和订单支付共用一个父路由
2. 封装过程
    1. 在router.js中引入路由文件并配置
        * 引入路由文件
        * ` Vue.use(Router) `
        * ` export default new Router({配置信息}) `
    2. 在main.js中加载路由
        * 引入总路由文件router
        * ` new Vue({ router, }) `加载

### 02.封装Storage

1. Cookie、localStorage、sessionStorage三者的区别
    * 存储大小：Cookie4k，Storage5M
    * 有效期：Cookie可自行设置有效期，Storage不可设置有效期。且localStorage为永久储存，除非手动清除localStorage；而sessionStorage当页面或者浏览器被关闭后自动清除
    * 与服务器的通信：Cookie会发送到服务器端，而Storage只存在于浏览器端，不参与和服务器的通信
    * 路径：Cookie有路径限制，Storage存储于域名下没有路径限制
    * API：Cookie没有特定的API，需要通过document.cookie去调用；而Storage有对应的API，可以直接调用
2. 为什么要封装Storage，本身不是已经有API了吗？
    * 本身有API，但只是简单的key/value形式
    * 只存储字符串，需要人工转换成json对象
    * 自带的API对Storage只能一次性清空，不能单个清空
3. 此处封装的是sessionStorage
4. 封装过程
    1. 在storage文件夹中的index.js文件中进行配置
        * 定义一个STORAGE_KEY为mall，此后每条storage信息都添加到对应的value上，以方便阅读
        * 分别配置setItem()、getItem()、getStorage()、clear()以实现对应的功能
    2. 配置完成后可以在App.vue的mounted()进行测试
        * storage.setItem('a', 1)
        * storage.setItem('user', { a: 1 })
        * storage.setItem('abc', { a: 1 }, 'user')
        * storage.clear('a')
        * storage.clear('a', 'user')

### 03.错误拦截

1. 错误拦截的应用场景
    * 统一报错
    * 未登录时统一拦截
    * 请求之、返回值统一拦截
2. 借助axios实现响应信息的拦截
3. 配置过程
    1. 在main.js中分别引入axios和vue-axios插件并声明使用
    2. 配置基础信息
        * axios.defaults.baseURL = '/api'
        * 响应超时限制：axios.defaults.timeout = 8000
    3. 配置拦截器interceptors，对拦截到的信息根据内容的不同做出相应的判断
        * 首先获取response.data，这并不是最终响应给出的值，而是经过axios封装后接口返回的值
        * 判断返回值中的状态码，其中0代表成功，10代表未登录，其他状态码后续补充
        * 最后根据状态码的不同给出不同的响应，实现错误拦截

### 04.Mock模拟数据

1. Mock的概念
    * Mock测试就是在测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试的测试方法。这个虚拟的对象就是Mock对象。Mock对象就是真实对象在调试期间的代替品。
2. 实现Mock的三种方案
    * 本地创建json
    * easy-mock平台
    * 集成Mock API(本项目采用)
3. 本地集成mock.js实现数据mock
    ```
        this.axios.get('/user/login').then((res) => {
			this.res = res
		}) 
    ```

## Day03 内容（首页开发-1）

### 01. 首页开发

1. HTML
    * 根据页面布局使用div建立网页基本结构

### 01. HTML

1.根据页面布局使用div建立网页基本结构

### 02.Scss

1. 概念
    * Sass是成熟、稳定、强大的CSS预处理器，而SCSS是Sass3版本当中引入的新语法特性，完全兼容CSS3的同时继承了Sass强大的动态功能。使用scss完善网页样式。
2. Scss文件结构
    * config.scss 项目css样式
    * reset.scss 初始化css样式
    * base.scss 公共css样式
    * mixin.scss 公共css样式(mixin版本，将多个样式定义为方法，简化css的书写)
    * 后续scss文件随时随进度补充 
3. 注：在使用scss时可能会报错，是因为插件版本不兼容
