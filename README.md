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

* 全局安装VueCli后，输入命令 "vue create 项目名" 以创建项目框架
* 根据提示分别输入命令 "cd 项目名" 和 "yarn serve" 运行项目，后续运行项目时只需输入 "yarn sserve"
* VueCli3.0增加了一个可视化项目管理工具，即Vue UI。运行命令为 "vue ui" ，打开后导入创建的项目
* 熟悉Vue UI操作，并在项目依赖中安装所需依赖，如axios、vue-router等

### 02.熟悉跨域结局方案

* CORS跨域
* JSONP跨域
* 代理跨域

### 03.按照模块化和组件化的思想初步整理项目结构

* api文件夹用于存放接口文档
* util文件夹用于存在共用机制，如金额格式化、文字转换等
* storage文件用于数据存储，存放localstorage、sessionstorage等
* store文件夹用于vuex的使用
* pages文件用于存放页面代码，其中使用组件化的思想对页面进行拆分和重组
* router.js文件用于存放路由