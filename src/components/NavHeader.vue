<template>
	<div class="header">
    <!-- 页面导航条 -->
		<div class="nav-topbar">
			<div class="container">
        <!-- 左侧菜单 -->
				<div class="topbar-menu">
					<a href="javascript:;">乐购商城</a>
					<a href="javascript:;">乐购门店</a>
					<a href="javascript:;">乐购服务</a>
					<a href="javascript:;">协议规则</a>
				</div>
        <!-- 右侧用户 -->
				<div class="topbar-user">
					<a href="javascript:;" v-if="username">{{ username }}</a>
					<a href="javascript:;" v-if="!username" @click="login"
						>登录</a
					>
					<a href="javascript:;" v-if="username" @click="logout"
						>退出</a
					>
					<a href="/#/order/list" v-if="username">我的订单</a>
					<a href="javascript:;" class="my-cart" @click="goToCart"
						><span class="icon-cart"></span>购物车({{
							cartCount
						}})</a
					>
				</div>
			</div>
		</div>
    <!-- 商品导航条 -->
		<div class="nav-header">
			<div class="container">
        <!-- logo -->
				<div class="header-logo">
					<a href="/#/index"></a>
				</div>
        <!-- 顶部商品菜单 -->
				<div class="header-menu">
					<div class="item-menu">
						<span>小米手机</span>
            <!-- 小米手机下拉菜单 -->
						<div class="children">
							<ul>
								<li
									class="product"
									v-for="(item, index) in phoneList"
									:key="index"
								>
									<a
										v-bind:href="'/#/product/' + item.id"
										target="_blank"
									>
										<div class="pro-img">
											<img
												v-lazy="item.mainImage"
												:alt="item.subtitle"
											/>
										</div>
										<div class="pro-name">
											{{ item.name }}
										</div>
										<div class="pro-price">
											{{ item.price | currency }}
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="item-menu">
						<span>RedMi红米</span>
					</div>
					<div class="item-menu">
						<span>电视</span>
            <!-- 电视下拉菜单 -->
						<div class="children">
							<ul>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-1.jpg'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">
											小米壁画电视 65英寸
										</div>
										<div class="pro-price">6999元</div>
									</a>
								</li>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-2.jpg'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">
											小米全面屏电视E55A
										</div>
										<div class="pro-price">1999元</div>
									</a>
								</li>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-3.png'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">
											小米电视4A 32英寸
										</div>
										<div class="pro-price">699元</div>
									</a>
								</li>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-4.jpg'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">
											小米电视4A 55英寸
										</div>
										<div class="pro-price">1799元</div>
									</a>
								</li>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-5.jpg'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">
											小米电视4A 65英寸
										</div>
										<div class="pro-price">2699元</div>
									</a>
								</li>
								<li class="product">
									<a href="" target="_blank">
										<div class="pro-img">
											<img
												v-lazy="
													'/imgs/nav-img/nav-3-6.png'
												"
												alt=""
											/>
										</div>
										<div class="pro-name">查看全部</div>
										<div class="pro-price">查看全部</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
        <!-- 搜索框 -->
				<div class="header-search">
					<div class="wrapper">
						<input type="text" name="keyword" />
						<a href="javascript:;"></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'nav-header',
    data() {
        return {
            username:'jack',
            phoneList:[]
        }
    },
    // 用于加工价格显示的过滤器
    filters: {
      currency(val) {
        if (!val) return '0.00'
        return '￥' + val.toFixed(2) + '元'
      },
    },
    mounted() {
        this.getProductList()
    },
    methods: {
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
      },
      // 跳转到登录页面
      login() {
        this.$router.push('/login')
      },
      // 跳转到购物车页面
      goToCart() {
        this.$router.push('/cart')
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
.header {
	.nav-topbar {
		height: 39px;
		line-height: 39px;
		background-color: #333333;
		color: #b0b0b0;
		.container {
			@include flex();
			a {
				display: inline-block;
				color: #b0b0b0;
				margin-right: 17px;
			}
			.my-cart {
				width: 110px;
				background-color: #ff6600;
				text-align: center;
				color: #ffffff;
				margin-right: 0;
				.icon-cart {
					@include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
					margin-right: 4px;
				}
			}
		}
	}
	.nav-header {
		.container {
			position: relative;
			height: 112px;
			@include flex();
			.header-menu {
				display: inline-block;
				width: 643px;
				padding-left: 209px;
				.item-menu {
					display: inline-block;
					color: #333333;
					font-weight: bold;
					font-size: 16px;
					line-height: 112px;
					margin-right: 20px;
					span {
						cursor: pointer;
					}
					&:hover {
						color: $colorA;
						.children {
							height: 220px;
							opacity: 1;
						}
					}
					.children {
						position: absolute;
						top: 112px;
						left: 0;
						width: 1226px;
						height: 0;
						opacity: 0;
						overflow: hidden;
						border-top: 1px solid #e5e5e5;
						box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
						z-index: 10;
						transition: all 0.5s;
						background-color: #ffffff;
						.product {
							position: relative;
							float: left;
							width: 16.6%;
							height: 220px;
							font-size: 12px;
							line-height: 12px;
							text-align: center;
							a {
								display: inline-block;
							}
							img {
								width: auto;
								height: 111px;
								margin-top: 26px;
							}
							.pro-img {
								height: 137px;
							}
							.pro-name {
								font-weight: bold;
								margin-top: 19px;
								margin-bottom: 8px;
								color: $colorB;
							}
							.pro-price {
								color: $colorA;
							}
							&:before {
								content: ' ';
								position: absolute;
								top: 28px;
								right: 0;
								border-left: 1px solid $colorF;
								height: 100px;
								width: 1px;
							}
							&:last-child:before {
								display: none;
							}
						}
					}
				}
			}
			.header-search {
				width: 319px;
				.wrapper {
					height: 50px;
					border: 1px solid #e0e0e0;
					display: flex;
					align-items: center;
					input {
						border: none;
						box-sizing: border-box;
						border-right: 1px solid #e0e0e0;
						width: 264px;
						height: 50px;
						padding-left: 14px;
					}
					a {
						@include bgImg(18px, 18px, '/imgs/icon-search.png');
						margin-left: 17px;
					}
				}
			}
		}
	}
}
</style>
