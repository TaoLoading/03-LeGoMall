<!-- 支付中转页面，跳转到支付宝 -->
<template>
  <div class="ali-pay">
    <!-- 加入loading页面是为了满足form提交所需的时间 -->
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
import Loading from './../components/Loading'
export default {
  name: 'alipay',
  components: {
    Loading,
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      // 默认展示loading页面
      loading: true,
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    // 支付
    paySubmit() {
      this.axios
        .post('/pay', {
          orderId: this.orderId,
          orderName: '乐购在线商城',
          // 支付价格，单位元
          amount: 0.01,
          // 支付方式：支付宝，2微信
          payType: 1,
        })
        .then((res) => {
          // 获取支付宝返回的form标签
          this.content = res.content
          setTimeout(() => {
            document.forms[0].submit()
          }, 100)
        })
    },
  },
}
</script>