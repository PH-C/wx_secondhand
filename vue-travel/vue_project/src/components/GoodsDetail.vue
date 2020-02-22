<template>
  <div>
    <div class="header">
      <div class="iconfont iconzuojiantou back" @click="back"/>
      <div v-if="collect == false" class="like iconfont iconshoucang1" @click="likeThis"/>
      <div v-else class="like iconfont iconcollection-b" style="color: #00c2c2;" @click="unlikeThis"/>
    </div>

    <cube-slide 
			ref="slide"
			:data="pic"
		>
      <cube-slide-item
			 v-for="(pitem, index) in pic"
			 v-bind:key="index"
			 class="bannerItem"
			>
        <img :src="$host +'/public' + pitem" class="bannerImg">
      </cube-slide-item>
    </cube-slide>

    <div class="goodsName">{{goodDetail.name}}</div>
    <div class="goodsPrice">￥{{goodDetail.price}}</div>
    <!-- <div class="chooseSize">
    	选择尺码
    	<span class="pleaseChoose" @click="showSizeBox">
    		请选择尺码<i class="iconfont iconjiantou" style="font-size: .3rem;"></i>
    	</span>
    </div> -->
    <div class="interview"/>
    <div class="interview"/>
    <div class="goodsDetailInfo">
    	<p>
    		货号
    		<span>
    		{{goodDetail.articleNumber}}
    		</span>
    	</p>
    </div>
    <div class="interview"/>
		<div style="width: 100%;margin: 0.2rem 0 0.2rem 0;font-size: .4rem;
    text-align: left;
    line-height: .56rem;">{{goodDetail.describe}}</div>
		<div
			style="width: 100%;margin-bottom: 2.5rem;"
		>
			<img
				v-for="(item, index) in pic"
				v-bind:key="index"
				:src="$host+'/public' + item"
				style="width: 100%;margin: 0;"
			/>
		</div>
   
    <div v-if="!showSize" class="buttonGroup">
    	<!-- <button class="sell" @click="showSizeBox">出售</button> -->
    	<button class="buy" @click="showSizeBox">立即购买</button>
    </div>
    <div v-if="showSize" class="sizeBox">
    	<div class="sizeBoxHeader">
    		<div class="iconfont iconcha close" @click="closeSizeBox"/>
	    	<div class="sizeBoxPriceBox">
	    		<p>￥{{goodDetail.price}}</p>
	    		<p>选择类型</p>
	    	</div>
    	</div>
    	<div class="allSize">
    		<div v-for="(item, index) in goodDetail.size"
        		 v-bind:key="item.id" 
						 :class="{'selected':showIndex==index}"
						  @click="selectSize(index)">
    				<p style="font-size: .46rem;margin-bottom: .2rem;">{{item}}</p>
    				<p style="font-size: .4rem;">￥{{item!="成人票"?goodDetail.price/2:goodDetail.price}}</p>
    		</div>
    	
    		<p  class="buyBtn">
    			<button @click="buy">立即购买</button>
    		</p>
    	</div>
    </div>
    <div v-if="showSize" class="blackBg" @click="closeSizeBox"  @touchmove.prevent/>
  </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  data() {
  	return {
			collect: false,
			goodDetail:{},
			pic:[],
  		showSize: false,
			showIndex: 0,
			host:''
  	}
	},
	created: function () {
		this.getData()
	},
	mounted:function(){
  
	},
  methods: {
		getData () {
      const _this = this;
      this.$http({
        method: 'GET',
        url: `${_this.$host}/api/product/${_this.$route.params.id}`,
        params: {

        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
					let goodDetail = res.data.data
					goodDetail.size = 	goodDetail.size.split(",")
					goodDetail.pic = 	goodDetail.pic.split(",")
					_this.goodDetail = goodDetail
					_this.pic = goodDetail.pic
					_this.collect = res.data.collect
        }
        
      }).catch(function (error) {
        console.log(error);
      });
		},
	
		likeProduct(){
			 const _this = this;
			 this.$http({
        method: 'POST',
        url: `${_this.$host}/api/collect`,
        data: {
					product_id: _this.goodDetail.id
        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
				 console.log("收藏成功！")
				 	_this.getData()
					_this.showToastType("收藏成功", "correct")
        }else if(res.data.code===400){
					console.log("您还没有登录")
					_this.$router.push({path: '/login'})
				}else{
					_this.showToastType(res.data.msg, "error")
				}
      }).catch(function (error) {
        console.log(error);
      });
		},
		unlikeProduct: function(){
			 const _this = this;
			 this.$http({
        method: 'POST',
        url: `${_this.$host}/api/uncollect`,
        data: {
					product_id: _this.goodDetail.id
        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
				 console.log("收藏成功！")
				 	_this.getData()
					_this.showToastType("取消收藏成功", "correct")
        }else if(res.data.code===400){
					console.log("您还没有登录")
					_this.$router.push({path: '/login'})
				}else{
					_this.showToastType(res.data.msg, "error")
				}
      }).catch(function (error) {
        console.log(error);
      });
		},
  	likeThis: function() {
			
			this.like = !this.like
			this.likeProduct()
		},
		unlikeThis: function(){
			this.like = !this.like
			this.unlikeProduct()
		},
  	showSizeBox: function(index){
  		this.showSize = !this.showSize
  	},
  	closeSizeBox: function() {
  		this.showSize = false
  	},
  	selectSize: function(index) {
			console.log("index", index)
  		this.showIndex = index
  	},
    back: function() {
      this.$router.back(-1)
    },
    buy: function() {
			const {goodDetail, showIndex} = this
			let size = goodDetail.size[showIndex];
			let price = size!="成人票"?goodDetail.price/2:goodDetail.price;
			const order = {
				"product": goodDetail,
				"product_id": goodDetail.id,
				"originalPrice": goodDetail.price,
				"price": price,
				"size": size
			}
			window.localStorage.setItem("order", JSON.stringify(order))
			this.$router.push({ path: '/OrderDetail'})
			
		},
		showToastType(txt, type) {
      const toast = this.$createToast({
        txt: txt,
        type: type
      })
      toast.show()
    }
  }
}
</script>

<style scoped>
  .header{
    box-sizing: border-box;
    height: .8rem;
    width: 100%;
    padding: .2rem .4rem 0 .4rem;
  }
  .back{
    float: left;
    font-size: .6rem;
  }
  .like{
    float: right;
    font-size: .5rem;
    margin-top: .1rem;
  }
  .liked{
  	color: #00c2c2 !important;
  }
  .bannerItem{
    height: 3.6rem;
  }
  .bannerImg{
    height: 100%;
  }
  .goodsName{
  	box-sizing: border-box;
  	width: 100%;
  	padding: 0 .4rem;
  	font-size: .5rem;
  	margin: .4rem 0;
  	text-align: center;
  }
  .goodsPrice{
  	font-size: .52rem;
  	margin-bottom: .4rem;
  }
  .chooseSize{
  	height: 1rem;
		line-height: 1rem;
		text-align: left;
		padding: 0 .4rem;
  	color: #807f8d;
  	font-size: .2rem;
  	border-top: 1px solid #ececee;
  }
  .pleaseChoose{
  	float: right;
  	color: #000;
  	align-items: center;
  }
  .interview{
  	width: 100%;
  	height: .2rem;
  	background: #f5f5f7;
  }
  .serverImg{
  	width: 100%;
  }
  .goodsDetailInfo{
  	font-size: .24rem;
  	color: #83838b;
  	margin-top: .4rem;
  }
  .goodsDetailInfo p{
  	box-sizing: border-box;
  	height: .8rem;
  	line-height: .6rem;
  	width: 100%;
  	padding: 0 .4rem;
  	text-align: left;
  }
  .goodsDetailInfo p span{
  	float: right;
  }
  .buttonGroup{
  	position: fixed;
  	z-index: 2;
  	box-sizing: border-box;
  	display: flex;
  	flex-direction: row;
  	width: 100%;
  	padding: 0 .4rem;
		position: fixed;
  	bottom: 0;
  	left: 0;
  	background: #fff;
  	padding-top: .4rem;
  	border-top: 1px solid #d2d1d7;
  }
  .buttonGroup button{
  	height: 1rem;
  	text-align: center;
  	line-height: 1rem;
  	outline: none;
  	border-radius: 4px;
  	margin-bottom: .2rem;
  }
  .sell{
  	flex: 1;
  	background: #fff;
  	border: 1px solid #d2d1d7;
  	margin-right: .2rem;
  }
  .buy{
  	flex: 3;
  	background: #00c2c2;
  	color: #fff;
  	border: 1px solid #00c2c2;
  }
  .sizeBox{
  	position: fixed;
  	z-index: 4;
  	bottom: 0;
  	left: 0;
  	box-sizing: border-box;
  	width: 100%;
  	text-align: left;
  	font-size: .4rem;
  	background: #fff;
  }
  .sizeBox img{
  	width: 3rem;
  }
  .sizeBoxPriceBox{
  	display: inline-block;
  }
  .sizeBoxHeader{
  	position: relative;
  	box-sizing: border-box;
  	width: 100%;
  	display: flex;
  	align-items: center;
  	line-height: .7rem;
  	padding: .4rem;
  }
  .close{
  	position: absolute;
  	top: .4rem;
  	right: .4rem;
  	font-size: .5rem;
  }
  .allSize{
  	box-sizing: border-box;
  	background: #f5f4f9;
  	width: 100%;
  	padding: .4rem;
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  }
  .allSize div{
  	width: 1.8rem;
  	height: 1.8rem;
  	margin-right: .4rem;
  	margin-bottom: .4rem;
  	background: #fff;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	flex-direction: column;
  	border-radius: 4px;
  	border: 1px solid #fff;
  }
  .eachSize:nth-child(4n){
  	margin-right: 0;
  }
  .blackBg{
  	position: fixed;
  	z-index: 3;
  	bottom: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background: #000000;
  	opacity: .4;
  }
  .selected{
  	border: 1px solid #000000 !important;
  }
  .buyBtn{
  	width: 100%;
  	padding: .2rem .4rem;
  }
  .buyBtn button{
  	width: 100%;
  	height: 1rem;
  	background: #00c2c2;
  	color: #fff;
  	border: none;
  	outline: none;
  	border-radius: 4px;
  }
</style>
