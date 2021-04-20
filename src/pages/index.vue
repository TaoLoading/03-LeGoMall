<!-- 首页 -->
<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图大区 -->
      <div class="swiper-box">
        <!-- 商品导航 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" v-bind:key="i">
                  <li v-for="(sub, j) in item" v-bind:key="j">
                    <a v-bind:href="sub ? '/#/product/' + sub.id : ''">
                      <img
                        v-bind:src="sub ? sub.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : '小米9' }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能家居</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">服装</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">鞋帽</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">零食</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">团购促销</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">9.9包邮</a>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/' + item.id"
              ><img v-bind:src="item.img"
            /></a>
          </swiper-slide>
          <!-- Swiper控件 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="guanggao">
        <!-- <a
          v-bind:href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          v-bind:key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a> -->
        <a href="/#/product/33">
          <img src="../../public/imgs/ads/ads-1.jpg" alt=""
        /></a>
        <a href="/#/product/33">
          <img src="../../public/imgs/ads/ads-2.jpg" alt=""
        /></a>
        <a href="/#/product/33">
          <img src="../../public/imgs/ads/ads-3.jpg" alt=""
        /></a>
        <a href="/#/product/33">
          <img src="../../public/imgs/ads/ads-4.jpg" alt=""
        /></a>
      </div>
      <!-- <div class="ads-box">
        <a
          v-bind:href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          v-bind:key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div> -->
      <!-- banner图 -->
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.jpg'" alt="" />
        </a>
      </div>
    </div>
    <!-- 商品展示区 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <!-- 左侧大图展示 -->
          <div class="banner-left">
            <a href="/#/product/35"
              ><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""
            /></a>
          </div>
          <!-- 右侧列表展示 -->
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" v-bind:key="i">
              <div class="item" v-for="(item, j) in arr" v-bind:key="j">
                <!-- 通过判断奇偶控制是否是新品 -->
                <span v-bind:class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="" />
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
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
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal,
  },
  data() {
    return {
      // 轮播图设置
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      // 轮播图数据
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpeg',
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpeg',
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg',
        },
      ],
      // 商品导航区数据
      menuList: [
        // 商品导航区为六行四列，故建立6*4二维数组。通过循环读取值
        // 因为数据较多且结构一致，故只实现了第一行数据的读取
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9',
          },
          {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版',
          },
          {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro',
          },
          {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区',
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      // 广告区数据
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png',
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg',
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png',
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg',
        },
      ],
      // 商品列表数据(通过调取接口读取)
      phoneList: [],
      showModal: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 加载商品列表
    init() {
      // 向服务器发送参数以获取相应的信息
      this.axios
        .get('/products', {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          // 因为数据库中商品图形状不一，故截取14条数据
          // 前6条数据用于顶部导航菜单中的展示，后8条用于此处商品展示区
          res.list = res.list.slice(6, 14)
          // 商品展示区为二行四列，故建立2*4二维数组
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
        })
    },
    // 添加到购物车
    addCart(id) {
      this.axios
        .post('/carts', {
          productId: id,
          selected: true,
        })
        .then((res) => {
          this.showModal = true
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        })
        .catch(() => {
          this.showModal = true
        })
    },
    // 打开购物车
    goToCart() {
      this.$router.push('/cart')
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: ' ';
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  } */
  .guanggao {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  content: ' ';
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
