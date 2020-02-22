<template>
    <div>
      <div class="header">
        <i class="iconfont iconzuojiantou back" @click="back"/>
        确认订单
      </div>
      <div class="userInfo">
         <!-- <img v-if="!userInfo.avatar" src="../../img/headImg.jpg">
        <img v-else-if="userInfo.avatar" :src="$host+'/public'+userInfo.avatar"> -->
        <div v-if="selAddress" @click="showAddressBox">
          {{selAddress.realName}}
          <i class="iconfont iconjiantou" style="float: right;font-size: .5rem;" ></i>
          <span style="float: right;margin-right: .2rem">{{selAddress.mobile}}</span>
          <div class="address">{{selAddress.address}}</div>
        </div>
        <div v-else-if="!selAddress" @click="showAddressBox">
           <cube-button :light="true" >暂无地址，添加地址</cube-button>
        </div>
      </div>
      <div class="interview"/>
      <div class="goodsRow">
        <img :src="order&& $host+'/public'+order.product.pic[0]" alt="">
        <div>
          <div class="goodsName">{{order.product&&order.product.name}}</div>
          <div style="font-size: .36rem;text-align: left">
            <span class="size">{{order.size}}</span>
            数量*1
            <span class="goodsPrice">￥{{order.price}}</span>
          </div>
        </div>
      </div>
      <div class="interview"/>
      <div class="bottom">
        实付款:<span style="font-size: .56rem;">￥{{order.price}}</span>
        <div class="button" @click="createOrder">
          提交订单
        </div>
      </div>

      <div v-if="showAddress" class="sizeBox">
        <div class="sizeBoxHeader">
          <div class="iconfont iconcha close" @click="closeAddressBox"/>
          <div class="sizeBoxPriceBox">
            <p>选择地址</p>
          </div>
        </div>
        <div class="allAddress ">
          <p  class="addBtn">
            <cube-button :light="true" @click="addAddress">添加地址</cube-button>
          </p>
          <div
              class="addressItem"
              v-for="(item, index) in address"
              v-bind:key="item.id" 
              :class="{'selected':showIndex==index}"
              @click="selectAddress(index)">
                <p>收货人: {{item.realName}} <span style="float: right;margin-right: .2rem">{{item.mobile}}</span></p>
                <div class="address">{{item.address}}}</div>
          </div>
        
          <p  class="buyBtn">
            <button @click="selectAddressOK">确认选择</button>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
  	return {
      address: [],
      order: {},
      selAddress:"",
      showAddress: false,
  		showIndex: 0
  	}
	},
  created: function () {
  	this.getData()
	},
  methods: {
    back: function() {
      this.$router.back(-1)
    },
    getData () {
      const _this = this;
      const order = JSON.parse(window.localStorage.getItem("order"))
      this.order = order;
      this.$http({
        method: 'GET',
        url: `${_this.$host}/api/users/address`,
        params: {

        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
					let address = res.data.data.rows
          _this.address = address
          _this.selAddress = address[0]
        }
        
      }).catch(function (error) {
        console.log(error);
      });
    },
    addAddress: function(){
      this.$router.push({path: '/addAddress'})
    },
    createOrder(){
       const _this = this;
       const { order, selAddress } = this;

			 this.$http({
        method: 'POST',
        url: `${_this.$host}/api/userorder`,
        data: {
          ...order,
          address:selAddress.realName+","+selAddress.mobile+","+selAddress.address
        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
				 console.log("收藏成功！")
          _this.showToastType("订单创建成功", "correct")
          //HistoryList
        	_this.$router.push({path: '/HistoryList'})
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
   	showAddressBox: function(index){
  		this.showAddress = !this.showAddress
  	},
  	closeAddressBox: function() {
  		this.showAddress = false
  	},
  	selectAddress: function(index) {
			console.log("index", index)
  		this.showIndex = index
    },
    selectAddressOK:function(){
      const {address, showIndex} = this
      this.selAddress = address[showIndex]
      this.closeAddressBox()
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
    line-height: 1rem;
    width: 100%;
    padding: .2rem .4rem;
    font-size: .5rem;
    text-align: left;
    border-bottom: 2px solid #e4e5e9;
  }
  .back{
    font-size: .6rem;
    margin-right: .4rem;
  }
  .userInfo{
    text-align: left;
    padding: .4rem;
    font-size: .4rem;
  }
  .address{
    margin-top: .3rem;
    font-size: .36rem;
    color: #d4d4d4;
  }
  .interview{
    width: 100%;
    height: .2rem;
    background: #f5f5f7;
  }
 
  .goodsRow{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
  }
  .goodsRow img{
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
  }
  .goodsName{
    font-size: .4rem;
    text-align: left;
    margin: .3rem 0;
  }
  .size{
    margin-right: .3rem;
  }
  .goodsPrice{
    float: right;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    height: 1.6rem;
    line-height: 1rem;
    box-sizing: border-box;
    width: 100%;
    padding: .36rem;
    font-size: .4rem;
    color: #F56C6C;
    text-align: left;
  }
  .button{
    float: right;
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    background: #04dfe1;
    text-align: center;
    font-size: .4rem;
    border-radius: 4px;
    color: #fff;
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
  .allAddress{
  	box-sizing: border-box;
  	background: #f5f4f9;
  	width: 100%;
  	padding: .4rem;
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  }
  .allAddress .addressItem{
  	width: 100%;
  	height: 1.5rem;
  	margin-right: .4rem;
  	margin-bottom: .4rem;
  	background: #fff;
    padding: 0.2rem;
  	border-radius: 4px;
  	border: 0;
  }
  .eachAddress:nth-child(4n){
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
  	border: 1px solid #cecece !important;
  }
  .buyBtn{
  	width: 100%;
  	padding: .2rem .4rem;
  }
  .addBtn{
	  width: 100%;
    padding: 0.2rem;
    margin-right: .4rem;
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
