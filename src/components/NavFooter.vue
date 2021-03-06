<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>乐购在线商城</p>
    </div>
    <div class="footer-link">
      <a href="https://github.com/TaoLoading" target="_blank">TaoLoading</a
      ><span>|</span> <a href="javascript:;" target="_blank">线下门店</a
      ><span>|</span> <a href="javascript:;" target="_blank">关于乐购</a
      ><span>|</span>
      <a href="javascript:;" target="_blank">售后服务</a>
    </div>
    <div class="copyright">
      Copyright ©2021 <span class="domain">legou.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
}
</script>
<style lang="scss" scoped>
.footer {
  height: 234px;
  border-top: 4px solid #ff6600;
  background-color: #333333;
  color: #999999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: #999999;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>