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

# 待完善

## 01. 未登录时点击商品上的购物车图标依然可以添加到购物车

* 问题推测：虽然未登录时错误拦截能够返回未登录的状态码，但页面没有做好跳转，可能是跳转路由出错

## 02. 购物车页面，所显示的“共n件商品，已选择n件”，其中n为购物车中商品类别数量而不是总数量

## 03.在商品详情页面点击加入购物车时没有提示

## 04.首页广告位没有显示出来

## 05.UI设计

# 项目进程

## Part01 内容

### 01.建立项目框架

1. 全局安装VueCli后，输入命令 "vue create 项目名" 以创建项目框架
2. 根据提示分别输入命令 "cd 项目名" 和 "yarn serve" 运行项目，后续运行项目时只需输入 "yarn serve"
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

## Part02 内容

### 01.封装路由

1. 根据设计稿对页面进行拆分，根据页面组件的可复用性明确页面组件之间的嵌套关系，在配置路由时要遵循这一嵌套关系
    * 如首页、商品站和商品详情共用一个父路由，订单下的订单确认、订单列表和订单支付共用一个父路由
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

## Part03 内容（首页-NavHeader）

### 01.HTML

1. 根据页面布局使用div建立网页基本结构
2. 注：后续HTML和CSS以及基础的js代码由于难度较低，不再列入本文档

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

### 03.调用产品接口读取产品数据

1. 应用位置
    * 顶部商品菜单下拉后展示的多个手机是通过调用产品接口从数据库中读取得出的
2. 过程
    1. 分别定义初试数据data、方法methods、调用过程mounted，即定义调用方式
        * methods：
        ```
        // 获取产品信息
        getProductList(){
            this.axios.get('/products',{
                params:{
                  // 向服务器发送参数以获取相应的信息(数据库中100012代表小米手机)
                    categoryId:'100012'
                }
            })
            // 由于只展示6栏故只获取前六项数据
            .then((res)=>{
                if(res.list.length>6){
                    this.phoneList = res.list.slice(0,6)
                }
            })
        }
        ```
    2. 由于使用的是代理跨域，故需在vue.config.js中将目标地址改为后台项目地址
        * ` target: 'http://mall-pre.springboot.cn' `
    3. 在调试工具的network中看是否成功返回产品信息
    4. 在HTML中读取数据
        * 使用` v-for="(item, index) in phoneList" :key="index" `遍历得到的数据phoneList
        * 使用` v-bind:href="'/#/product/' + item.id" `绑定对应的产品
        * 使用` :src="item.mainImage" `绑定对应产品的图片地址
        * 使用` :alt="item.subtitle" `绑定对应产品的名称
        * 使用模板语法得到产品名称及价格
        * 注：在显示价格时为使结果更加严谨添加了过滤器
            ``` 
            filters: {
              currency(val) {
              if (!val) return '0.00'
              return '￥' + val.toFixed(2) + '元'
              },
            },
            ```

## Part04 内容（首页-NavFooter和ServiceBar）

### 没有难度，简单略过

## Part05 内容（首页-轮播图）

### 01.轮播图功能

1. 基础轮播
2. 点击跳转到商品详情
3. 拖拽翻页

### 02.Swiper

1. 定义
    * Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。
2. 功能
    * Swiper能实现触屏焦点图、触屏Tab切换、触屏轮播图切换等常用效果。
    * 本项目采用Swiper实现轮播图效果
3. 实现过程
    1. 引入Swiper模块并注册
        * 由于只实现轮播效果，故用解构的形式引入Swiper插件：` import { swiper, swiperSlide } from 'vue-awesome-swiper' `
        * 引入Swiper的css样式：` import 'swiper/dist/css/swiper.css' `
        * 在components中注册Swiper
    2. 建立轮播图布局代码和控件代码(此处包含了读取第3步数据的代码)
        ```
        <!-- 布局 -->
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/' + item.id"
              ><img v-bind:src="item.img"
            /></a>
          </swiper-slide>
          <!-- 控件 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        ```
    3. 建立轮播所需要的数据(在data()中定义)
        1. swiperOption
            ```
            swiperOption: {
            autoplay: true,
            loop: true,
            }
            ```
        2. 图片数据(由于没有提高轮播接口，故需要自行建立轮播所需的图片数据)
            ```
            slideList: [
            {
              id: '42',
              img: '/imgs/slider/slide-1.jpg',
            },
            ...
            ],
            ```
    4. 完善css样式
    5. 完善翻页效果(在data()的swiperOption中定义)
        1. 使用Swiper中effect定义翻页效果：` effect: 'cube' `
            ```
            effect: 'cube',
            cubeEffect: {
              shadowOffset: 100,
              shadowScale: 0.6,
            },
            ```
        2. 定义分页器效果
            ```
            effect: 'cube',
            cubeEffect: {
              shadowOffset: 100,
              shadowScale: 0.6,
            },
            ```
        3. 定义翻页控件效果
            ```
            effect: 'cube',
            cubeEffect: {
              shadowOffset: 100,
              shadowScale: 0.6,
            },
            ```
## Part05 内容（首页-商品展示区）

### 与NavHeader中读取商品类似，即调用接口获得数据库中商品的数据并渲染到页面

## Part05 内容（首页-Modal弹窗组件）

### 1.功能

1. 实现弹窗效果
2. 实现过程
    1. 定义Modal组件架构，即modal.vue
    2. 定义Modal组件架构，即modal.scss
    3. 调用接口将组件渲染进页面，并完善信息
        ```
        <modal
          title="提示"
          sureText="查看购物车"
          btnType="1"
          modalType="middle"
          v-bind:showModal="showModal"
          v-on:submit="goToCart"
          v-on:cancel="showModal = false"
        >
          <template v-slot:body>
            <p>商品添加成功！</p>
          </template>
        </modal>
        ```
    4. 完善css样式
    5. 使用transition组件实现淡入淡出效果

## Part06 内容（首页-图片懒加载）

### 1.懒加载作用

1. 使用图片懒加载，防止页面一次性向服务器发送大量请求导致页面卡顿的现象出现，从而提高用户体验。

### 2.实现过程

1. 下载vue-lazyload插件，在main.js中导入并声明使用
2. 配置vue-lazyload
    ```
    Vue.use(VueLazyLoad, {
	    loading: '/imgs/loading-svg/loading-bars.svg',
    })
    ```
3. 对需要进行懒加载的图片进行处理，将路径声明由` :src `修改为` v-lazy `

## Part06 内容（登录注册）

### 1.登录功能的基础实现过程

1. 通过双向绑定获取输入的用户名和密码
2. 调用后台登录接口
    ```
    login() {
      let { username, password } = this
      this.axios
        .post('/user/login', {
          username,
          password,
        })
        .then((res) => {
          this.$router.push({
            name: 'index',
            params: {
              from: 'login',
            },
          })
        })
    },
    ```
3. 借助vue-cookie将登录信息存到cookie中
   * 在main.js中声明并使用
   * 在login方法中存入cookie，` this.$cookie.set('userId', res.id, { expires: '1M' }) `

### 2.注册功能的基础实现过程

1. 注册功能与登录功能类似，略过

### 3.调用接口获取用户信息及购物车信息并使用vuex实现组件间通信

1. 建立vuex项目结构(store文件内)
    1. index.js 初始状态
    2. actions.js 存储信息
    3. mutations.js 改变状态
    4. 在main.js中导入index.js
2. 在login.vue中分发事件，以触发action行为
    ` this.$store.dispatch('saveUserName', res.username) `
3. 在App.vue中读取用户信息及购物车信息
    ```
    mounted() {
      if (this.$cookie.get('userId')) {
        this.getUser()
        this.getCartCount()
      }
    },
    methods: {
      // 获取用户信息
      getUser() {
        this.axios.get('/user').then((res = {}) => {
          this.$store.dispatch('saveUserName', res.username)
        })
      },
      // 获取购物车中商品数量
      getCartCount() {
        this.axios.get('/carts/products/sum').then((res = 0) => {
          this.$store.dispatch('saveCartCount', res)
        })
      },
    },
    ```
4. 在NavHeader中读取数据用以展示信息
    ```
    computed: {
      username() {
        return this.$store.state.username
      },
      cartCount() {
        return this.$store.state.cartCount
      },
    },
    ```
    * 注：在computed中读取数据而不是在data中直接读取，是因为当程序启动时，先加载App.vue，再加载NavHeader.vue。调用接口获取用户信息并写入的整个过程放在App.vue中，整个过程需要时间，而在NavHeader.vue中读取数据的过程相比之下几乎不需要时间，这就导致了先在NavHeader.vue中读取数据时数据还没有被请求回来，所以这种情况有可能会取不到值

5. 使用myActions和myState完善vuex

## Part07 内容（商品站）

### 1.磁吸效果实现

1. 定义实现磁吸效果的方法
    ```
    methods: {
      // 磁吸效果实现
      // 兼容性处理
      initHeight() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        // 滚动距离超过152开始固定
        this.isFixed = scrollTop > 152 ? true : false
      },
    },
    ```
2. 添加页面滚动的事件监听
    ```
    mounted() {
      window.addEventListener('scroll', this.initHeight)
    },
    ```
3. 定义动态样式isFixed，并定义到:class中

### 2.视频弹窗实现

1. 借助HTML5中videos实现
    ```
    <video
      src="/imgs/product/video.mp4"
      muted
      autoplay
      controls="controls"
    ></video>
    ```
2. 完善弹窗的css样式
3. 借助animation实现弹入弹出动画
4. 调用接口获取商品信息，并渲染到商品站页面
5. 解决打开调试工具后视频会出现
    * 原因：调试工具打开后视频窗口变小，而之前视频移除是靠位移距离实现的，窗口变小导致视频出现
    * 解决：定义计时器，时间设置为关闭视频动画的所需时间，当点击关闭视频按钮后，先实现视频关闭动画，再隐藏整个视频结构

## Part07 内容（商品详情页）

1. 从数据库中读取数据并渲染到页面
2. 商品信息与购买信息相对应
3. 添加到购物车
4. 购物车数量统计

## Part08 内容（购物车）

1. OrderHeader中使用插槽渲染提示信息tip
2. 购物车列表的渲染
3. 选中状态
4. 商品数量
5. 结算功能
6. 注：以上信息都是通过与后台交互得到

## Part08 内容

### 1. Element UI

1. 引入插件
    * element-ui
    * babel-plugin-component：实现按需加载
    * 注：按需引入和按需加载的区别是，最后导出包的时候按需引入仍会导入整个包，而按需加载不会
2. 配置babel.config.js
3. 在main.js中引入插件并使用
    ```
    import { Message } from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    ```
4. 调用
    1. 方式一，调用` Message.xxx `的形式
    2. 方式二，将Message挂载到Vue实例上，使用挂载后的方式调用

### 2. babel

## Part08 内容（退出功能）

### 注意点

1. 清除cookie
2. 重新获取数据。由于是单页面应用，故点击退出后不会刷新页面，导致定义在App上的方法不会被调用。故退出后需要重新获取购物车数量，以保证数量同步
3. 项目优化。对从login跳转到index的页面进行获取后台数据的处理，而直接跳转到index页面的不会进行获取数据的处理，防止浪费资源的现象发生

## Part08 内容（订单确认）
## Part09 内容（支付宝支付）
## Part10 内容（微信支付）
1. 调用接口拿到服务器返回的字符串
2. 使用qrcode将字符串转换为图片
3. 将图片保存下来，传给子组件来进行渲染
4. 展示弹窗
5. 点击关闭按钮，关闭弹窗