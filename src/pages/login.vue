<!-- 登录页面 -->
<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt="" /></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms">欢迎进入乐购商城</div>
            <div class="reg" @click="register">没有账号？点击立即注册</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://github.com/TaoLoading" target="_blank">TaoLoading</a
        ><span>|</span> <a href="javascript:;" target="_blank">线下门店</a
        ><span>|</span> <a href="javascript:;" target="_blank">关于乐购</a
        ><span>|</span>
        <a href="javascript:;" target="_blank">售后服务</a>
      </div>
      <p class="copyright">Copyright ©2021 legou.com All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      userId: '',
    }
  },
  methods: {
    // 登录
    login() {
      let { username, password } = this
      this.axios
        .post('/user/login', {
          username,
          password,
        })
        .then((res) => {
          this.$cookie.set('userId', res.id, { expires: 'Session' })
          this.$store.dispatch('saveUserName', res.username)
          // this.saveUserName(res.username)
          this.$router.push({
            name: 'index',
            params: {
              from: 'login',
            },
          })
        })
    },
    register() {
      this.$router.push('/register')
    },
  },
}
</script>
<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 450px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        left: 50%;
        margin-left: -205px;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff0047;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          .sms {
            color: #ff0047;
          }
          .reg {
            color: #999999;
            cursor: pointer;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>