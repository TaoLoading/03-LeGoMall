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

### 02.熟悉跨域结局方案

1. CORS跨域
2. JSONP跨域
3. 代理跨域

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