<!-- 订单列表页面 -->
<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- 加入loading，等待数据获取 -->
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money">
                      {{ item.totalPrice + 'X' + item.quantity }}元
                    </div>
                  </div>
                </div>
              </div>
              <!-- 已付款 -->
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <!-- 未付款 -->
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="loading" @click="loadMore"
              >加载更多</el-button
            >
          </div>
          <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <img
              src="/imgs/loading-svg/loading-spinning-bubbles.svg"
              alt=""
              v-show="loading"
            />
          </div>
          <!-- 当loading界面关闭并且没有数据时显示 -->
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
  },
  data() {
    return {
      loading: false,
      list: [],
      T: '',
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表
    getOrderList() {
      this.loading = true
      this.busy = true
      this.axios
        .get('/orders', {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.loading = false
          this.list = this.list.concat(res.list)
          this.total = res.total
          this.showNextPage = res.hasNextPage
          this.busy = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 去支付
    goPay(orderNo) {
      // 三种路由跳转方式
      /**
       * 第一种，直接跳转
       * this.$router.push('/order/pay')
       *
       * 第二种，使用name
       * this.$router.push({
       *   name:'order-pay', // 此处是路由名称
       *   query:{
       *     orderNo
       *   }
       * })
       *  */
      // 第三种，使用path
      this.$router.push({
        path: '/order/pay', // 此处是路由路径
        query: {
          orderNo,
        },
      })
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        // 拉取订单状态(0：已取消，10：未付款，20：已付款)
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          // 当订单已支付时
          if (res.status == 20) {
            // 清除定时器
            clearInterval(this.T)
            // 跳转到订单列表
            this.goOrderList()
          }
        })
      }, 1000)
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
    }
  }
}
</style>loacl