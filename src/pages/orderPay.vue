<!-- 支付页面 -->
<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情<em
                  class="icon-down"
                  :class="{ up: showDetail }"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderId }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{ addressInfo }}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <!-- 遍历订单详情获取商品图片和名称 -->
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{ item.productName }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali"
              :class="{ checked: payType == 1 }"
              @click="paySubmit(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: payType == 2 }"
              @click="paySubmit(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信支付弹窗 -->
    <scan-pay-code
      v-if="showPay"
      @close="closePayModal"
      :img="payImg"
    ></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>
<script>
// qrcode，用于生成二维码
import QRCode from 'qrcode'
import OrderHeader from './../components/OrderHeader'
import ScanPayCode from './../components/ScanPayCode'
import Modal from './../components/Modal'
export default {
  name: 'order-pay',
  data() {
    return {
      // 获取传过来的参数(query传参)
      orderId: this.$route.query.orderNo,
      // 收货人地址
      addressInfo: '',
      // 订单详情，包含商品列表
      orderDetail: [],
      // 是否显示订单详情
      showDetail: false,
      // 支付类型
      payType: '',
      // 是否显示微信支付弹窗
      showPay: false,
      // 微信支付的二维码地址
      payImg: '',
      // 是否显示二次支付确认弹框
      showPayModal: false,
      // 订单总金额
      payment: 0,
      // 定时器ID
      T: '',
    }
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Modal,
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        // 获取收货地址对象
        let item = res.shippingVo
        // 拼接收货地址
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        // 获取订单详情
        this.orderDetail = res.orderItemVoList
        this.payment = res.payment
      })
    },
    // 支付类型
    paySubmit(payType) {
      if (payType == 1) {
        // 支付宝支付
        // 当选择支付宝支付时，以新窗口的形式('_blank')打开支付宝中间页
        window.open('/#/order/alipay?orderId=' + this.orderId, '_blank')
      } else {
        // 微信支付
        this.axios
          .post('/pay', {
            orderId: this.orderId,
            orderName: '乐购在线商城',
            // 支付金额，单位元
            amount: 0.01,
            // 支付方式：1支付宝，2微信
            payType: 2,
          })
          .then((res) => {
            // 使用qrcode将获取到的res.content转换成base64格式的二维码
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.showPay = true
                this.payImg = url
                // 开始轮询订单状态
                this.loopOrderState()
              })
              .catch(() => {
                this.$message.error('微信二维码生成失败，请稍后重试')
              })
          })
      }
    },
    // 关闭微信弹框
    closePayModal() {
      this.showPay = false
      this.showPayModal = true
      // 清除定时器
      clearInterval(this.T)
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
            // 刷新页面
            window.localtion.reload()
          }
        })
      }, 1000)
    },
    goOrderList() {
      this.$router.push('/order/list')
    },
  },
}
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>